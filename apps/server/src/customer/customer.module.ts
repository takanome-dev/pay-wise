import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { UserModule } from '../user/user.module';
import { JwtConfigModule } from '../jwt/jwt.module';

@Module({
  imports: [TypeOrmModule.forFeature([Customer]), UserModule, JwtConfigModule],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}
