/* eslint-disable */
import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// import { Card } from '../card/card.entity';
import { CardService } from '../card/card.service';
// import { Customer } from '../customer/customer.entity';
import { CustomerService } from '../customer/customer.service';
import { TransactionService } from '../transaction/transaction.service';

import { User } from './user.entity';

import type { RegisterUserDto } from '../auth/auth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userService: Repository<User>,
    @Inject(forwardRef(() => CardService))
    private readonly cardService: CardService,
    @Inject(forwardRef(() => CustomerService))
    private readonly customerService: CustomerService,
    private readonly transactionService: TransactionService,
  ) {}

  findAll() {
    // TODO: add params to include relations
    return this.userService.find();
  }

  findById(id: string) {
    return this.userService.findOne({
      where: {
        id,
      },
    });
  }

  findByEmail(email: string) {
    return this.userService.findOne({
      where: {
        email,
      },
    });
  }

  findByUsername(username: string) {
    return this.userService.findOne({
      where: {
        username,
      },
    });
  }

  findCurrentUser(id: string) {
    return this.userService.findOne({
      where: { id },
    });
  }

  async getUserKPIs(userId: string) {
    const user = await this.findById(userId);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const results = await Promise.all([
      await this.cardService.getKpis(userId),
      await this.customerService.getKpis(userId),
      await this.transactionService.getKpis(userId),
    ]);

    const cardKPIs = results[0];
    const customerKPIs = results[1];
    const transactionKPIs = results[2];

    const data = [
      ...customerKPIs.customers,
      ...cardKPIs.cards,
      ...transactionKPIs.transactions,
    ].map((item) => ({
      date: new Date(item.created_at).toISOString().substring(0, 10),
      type:
        item.role === 'customer'
          ? 'Customers'
          : item.cc_number
          ? 'Cards'
          : 'Transactions',
    }));

    const dates = Array.from(new Set(data.map((item) => item.date))).sort();

    const groupedData = dates.reduce((acc, date) => {
      acc[date] = { date, Customers: 0, Cards: 0, Transactions: 0 };
      return acc;
    }, {});

    data.forEach((item) => {
      const { date, type } = item;
      groupedData[date][type]++;
    });

    return {
      performance: Object.values(groupedData),
      totalCustomers: customerKPIs.totalCustomers,
      totalCards: cardKPIs.totalCards,
      totalTransactions: transactionKPIs.totalTransactions,
      totalAmount: transactionKPIs.totalAmount,
    };
  }

  create(userInfos: RegisterUserDto) {
    const newUser = this.userService.create(userInfos);
    return this.userService.save(newUser);
  }

  // TODO: break down this method into smaller ones
  // TODO: like updatePassword, updateProfile, etc.
  // async update(userInfos: UpdateUserDto, userId: string) {
  //   const foundUser = await this.findById(userId);

  //   if (!foundUser) {
  //     throw new BadRequestException('user not found');
  //   }

  //   return this.userService.update(userId, {
  //     ...foundUser,
  //     ...userInfos,
  //     password: foundUser.password,
  //     role: foundUser.role,
  //     is_verified: foundUser.is_verified,
  //   });
  // }

  deleteAll() {
    return this.userService.delete({});
  }
}
