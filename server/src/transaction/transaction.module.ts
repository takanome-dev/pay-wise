import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CardModule } from '../card/card.module';
import { JwtConfigModule } from '../jwt/jwt.module';
import { UserModule } from '../user/user.module';

import { TransactionController } from './transaction.controller';
import { Transaction } from './transaction.entity';
import { TransactionService } from './transaction.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction]),
    forwardRef(() => UserModule),
    forwardRef(() => CardModule),
    // CardModule,
    JwtConfigModule,
  ],
  providers: [TransactionService],
  controllers: [TransactionController],
  exports: [TransactionService],
})
export class TransactionModule {}
