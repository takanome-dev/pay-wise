import { IsIn, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  @IsIn(['recharge', 'transfer'])
  readonly type: string;

  @IsString()
  @IsOptional()
  readonly description: string;

  @IsNumber()
  @Min(500)
  readonly amount: number;

  @IsString()
  card_id: string;
}
