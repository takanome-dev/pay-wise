import { IsIn, IsOptional, IsString } from 'class-validator';

export class CreateCardDto {
  @IsString()
  number: string;

  @IsString()
  @IsIn(['visa', 'mastercard'])
  brand: string;

  @IsString()
  @IsIn(['virtual', 'giftcard'])
  type: string;

  @IsString()
  expiry: string;

  @IsString()
  cvv: string;

  @IsString()
  @IsOptional()
  pin: string;

  @IsString()
  @IsOptional()
  balance: string;

  @IsString()
  amount: string;

  @IsString()
  @IsOptional()
  currency: string;

  @IsString()
  user_id: string;
}
