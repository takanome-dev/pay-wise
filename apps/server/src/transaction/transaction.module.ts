import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { CardModule } from '../card/card.module';
import { Transaction } from './transaction.entity';
import { JwtConfigModule } from '../jwt/jwt.module';

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
