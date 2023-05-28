import { PickType } from '@nestjs/mapped-types';
import { IsIn, IsString, MaxLength, MinLength } from 'class-validator';

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
  @MaxLength(4)
  @MinLength(4)
  pin: string;

  @IsString()
  customer_id: string;
}

export class RegisterCardDto extends PickType(CreateCardDto, [
  'brand',
  'type',
  'pin',
] as const) {}
