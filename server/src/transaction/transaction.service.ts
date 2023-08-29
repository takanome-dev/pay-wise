import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CardService } from '../card/card.service';

import { Transaction } from './transaction.entity';

import type { CreateTransactionDto } from './transaction.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionService: Repository<Transaction>,
    private readonly cardService: CardService,
    private readonly userService: UserService,
  ) {}

  async findAll(userId: string) {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.role === 'admin') {
      return this.transactionService.find();
    }

    return this.transactionService.find({
      where: {
        user: { id: userId },
      },
    });
  }

  async create(transactionInfos: CreateTransactionDto, userId: string) {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const card = await this.cardService.findByCardNumber(
      transactionInfos.card_number,
    );
    if (!card) throw new NotFoundException('Card not found');

    // TODO: currently, we only support recharge and transfer that's why
    // we don't need to check the transaction type
    card.balance += transactionInfos.amount;
    await this.cardService.updateBalance(card.id, card.balance);

    const newTransaction = this.transactionService.create({
      ...transactionInfos,
      status: 'success',
      card,
      user,
    });

    await this.transactionService.save(newTransaction);

    return {
      message: 'Transaction created successfully',
      data: newTransaction,
    };
  }

  getNumberOfTransactionsMade(userId: string) {
    return this.transactionService.count({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  getTotalAmountReceived(userId: string) {
    return this.transactionService
      .createQueryBuilder('transaction')
      .select('SUM(transaction.amount)', 'totalAmountReceived')
      .where('transaction.user = :userId', { userId })
      .getRawOne();
  }
}
