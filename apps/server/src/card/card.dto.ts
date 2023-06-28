import { PickType } from '@nestjs/mapped-types';
import { IsIn, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateCardDto {
  @IsString()
  cc_number: string;

  @IsString()
  @IsIn(['visa', 'mastercard'])
  brand: string;

  @IsString()
  @IsIn(['virtual', 'physical'])
  type: string;

  @IsString()
  exp_month: string;

  @IsString()
  exp_year: string;

  @IsString()
  cvv: string;

  @IsString()
  @IsIn(['USD', 'EUR', 'GBP'])
  currency: string;

  // @IsString()
  // @MaxLength(4)
  // @MinLength(4)
  // pin: string;

  @IsString()
  @IsOptional()
  customer_id: string;

  @IsString()
  @IsOptional()
  user_id: string;
}

export class RegisterCardDto extends PickType(CreateCardDto, [
  'brand',
  'type',
  'currency',
] as const) {}

export class RegisterUserCardDto extends RegisterCardDto {
  @IsString()
  @MinLength(36)
  user_id: string;
}

export class RegisterCustomerCardDto extends RegisterCardDto {
  @IsString()
  @MinLength(36)
  customer_id: string;
}
