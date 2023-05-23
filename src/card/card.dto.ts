import { PickType } from '@nestjs/mapped-types';
import { IsIn, IsOptional, IsString } from 'class-validator';

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
  @IsOptional()
  card_balance: string;

  @IsString()
  @IsOptional()
  card_status: string;

  @IsString()
  @IsOptional()
  card_currency: string;

  @IsString()
  user_id: string;
}

export class RegisterCardDto extends PickType(CreateCardDto, [
  'card_brand',
  'card_type',
  'card_currency',
] as const) {}
