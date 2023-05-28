import { OmitType } from '@nestjs/mapped-types';
import { IsEmail, IsIn, IsOptional, IsString } from 'class-validator';

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

  @IsString()
  @IsIn(['USD', 'EUR', 'GBP'])
  @IsOptional()
  currency: string;

  @IsString()
  @IsOptional()
  user_id: string;
}
