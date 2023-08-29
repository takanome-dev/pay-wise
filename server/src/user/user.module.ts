import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CardModule } from '../card/card.module';
import { CustomerModule } from '../customer/customer.module';
import { JwtConfigModule } from '../jwt/jwt.module';
import { TransactionModule } from '../transaction/transaction.module';

import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtConfigModule,
    CustomerModule,
    TransactionModule,
    forwardRef(() => CardModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
