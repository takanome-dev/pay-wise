import { PickType } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

import { Customer } from './customer.entity';

export class CreateCustomerDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsString()
  @IsOptional()
  city: string;

  @IsString()
  @IsOptional()
  country: string;

  @IsString()
  @IsOptional()
  address: string;
}
export class CreateCustomerBodyDto extends PickType(Customer, [
  'address',
  'city',
  'country',
  'email',
  'first_name',
  'last_name',
  'phone',
]) {}
