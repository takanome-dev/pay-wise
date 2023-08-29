import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CardService } from '../card/card.service';

import { Transaction } from './transaction.entity';

import type { CreateTransactionDto } from './transaction.dto';
import type { JwtUserDto } from '../user/user.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionService: Repository<Transaction>,
    private cardService: CardService,
  ) {}

  findAll(user: JwtUserDto) {
    if (user.role === 'admin') {
      return this.transactionService.find();
    }

    return this.transactionService.find({ where: { user: { id: user.sub } } });
  }

  async create(transactionInfos: CreateTransactionDto, userId: string) {
    const card = await this.cardService.findById(transactionInfos.card_id);
    if (!card) throw new NotFoundException('Card not found');

    // TODO: currently, we only support recharge and transfer that's why
    // we don't need to check the transaction type
    card.balance += transactionInfos.amount;
    await this.cardService.updateBalance(card.id, card.balance);

    const newTransaction = this.transactionService.create({
      ...transactionInfos,
      status: 'success',
      card,
      user: { id: userId },
    });

    await this.transactionService.save(newTransaction);

    return {
      message: 'Transaction created successfully',
      data: newTransaction,
    };
  }
}
