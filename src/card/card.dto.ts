import { PickType } from '@nestjs/mapped-types';
import {
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCardDto {
  @IsString()
  card_number: string;

  @IsString()
  @IsIn(['visa', 'mastercard'])
  card_brand: string;

  @IsString()
  @IsIn(['virtual', 'giftcard', 'physical'])
  card_type: string;

  @IsString()
  expiry_date: string;

  @IsString()
  card_cvv: string;

  @IsString()
  @MaxLength(4)
  @MinLength(4)
  card_pin: string;

  @IsNumber()
  @IsOptional()
  card_balance: number;

  @IsString()
  @IsOptional()
  card_status: string;

  @IsString()
  @IsOptional()
  @IsIn(['XOF', 'USD', 'EUR'])
  card_currency: string;

  @IsString()
  user_id: string;
}

export class RegisterCardDto extends PickType(CreateCardDto, [
  'card_brand',
  'card_type',
  'card_currency',
  'card_pin',
] as const) {}
