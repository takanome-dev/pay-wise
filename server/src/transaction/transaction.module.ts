import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CardModule } from '../card/card.module';
import { JwtConfigModule } from '../jwt/jwt.module';

import { TransactionController } from './transaction.controller';
import { Transaction } from './transaction.entity';
import { TransactionService } from './transaction.service';

@Module({
  imports: [
    CardModule,
    JwtConfigModule,
    TypeOrmModule.forFeature([Transaction]),
  ],
  providers: [TransactionService],
  controllers: [TransactionController],
  exports: [TransactionService],
})
export class TransactionModule {}
