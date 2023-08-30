import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CardService } from '../card/card.service';
import { UserService } from '../user/user.service';

import { Transaction } from './transaction.entity';

import type { CreateTransactionDto } from './transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionService: Repository<Transaction>,
    @Inject(forwardRef(() => CardService))
    private readonly cardService: CardService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  baseQueryBuilder() {
    const builder = this.transactionService.createQueryBuilder('transactions');
    return builder;
  }

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

  async getKpis(userId: string) {
    const queryBuilder = this.baseQueryBuilder();

    queryBuilder
      .select('*')
      .where('transactions.user_id = :userId', { userId });

    const [itemCount, entities] = await Promise.all([
      queryBuilder.getCount(),
      queryBuilder.getRawMany(),
    ]);

    const totalAmount = entities.reduce(
      (acc: number, curr: Transaction) => acc + Number(curr.amount),
      0,
    ) as number;

    return {
      totalTransactions: itemCount,
      totalAmount,
      transactions: entities,
    };
  }
}
