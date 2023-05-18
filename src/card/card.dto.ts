import { IsOptional, IsString } from 'class-validator';

export class CreateCardDto {
  @IsString()
  number: string;

  @IsString()
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
  @IsOptional()
  currency: string;

  @IsString()
  user_id: string;
}
