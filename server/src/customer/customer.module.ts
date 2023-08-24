import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtConfigModule } from '../jwt/jwt.module';
import { UserModule } from '../user/user.module';

import { CustomerController } from './customer.controller';
import { Customer } from './customer.entity';
import { CustomerService } from './customer.service';

/**
 *
 */
@Module({
  imports: [TypeOrmModule.forFeature([Customer]), UserModule, JwtConfigModule],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}
