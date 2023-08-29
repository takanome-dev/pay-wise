import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtConfigModule } from '../jwt/jwt.module';

import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';
import { CardModule } from '../card/card.module';
import { CustomerModule } from '../customer/customer.module';
import { TransactionModule } from '../transaction/transaction.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtConfigModule,
    CustomerModule,
    TransactionModule,
    CardModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
