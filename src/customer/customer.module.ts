import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../common/guards/roles.guard';
import { AuthGuard } from '../auth/auth.guard';
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
