import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({
    description: 'Transaction type',
    example: 'recharge',
  })
  @IsString()
  @IsIn(['recharge', 'transfer'])
  readonly type: string;

  @ApiProperty({
    description: 'Transaction description',
    example: 'Recharging 1000 FCFA',
  })
  @IsString()
  @IsOptional()
  readonly description: string;

  @ApiProperty({
    description: 'Transaction amount',
    example: 1000,
  })
  @IsNumber()
  @Min(500)
  readonly amount: number;

  @ApiProperty({
    description: 'Transaction card number',
    example: '1234567890123456',
  })
  @IsString()
  card_number: string;
}
