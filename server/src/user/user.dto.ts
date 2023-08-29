import { OmitType, PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  phone: string;

  @IsString()
  city: string;

  @IsString()
  country: string;

  @IsString()
  address: string;

  @IsString()
  image: string;
}

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['password']),
) {}

export class JwtUserDto {
  @IsString()
  sub: string;

  @IsString()
  email: string;

  @IsString()
  role: string;

  @IsNumber()
  iat: number;

  @IsNumber()
  exp: number;
}

// cardsCreated: { type: 'number' },
// customersCreated: { type: 'number' },
// transactionsMade: { type: 'number' },
// totalAmountReceived: { type: 'number' },
export class KPIDto {
  @ApiProperty({
    description: 'Number of cards created',
    example: 2,
  })
  @IsNumber()
  cardsCreated: number;

  @ApiProperty({
    description: 'Number of customers created',
    example: 1,
  })
  @IsNumber()
  customersCreated: number;

  @ApiProperty({
    description: 'Number of transactions made',
    example: 1,
  })
  @IsNumber()
  transactionsMade: number;

  @ApiProperty({
    description: 'Total amount received',
    example: 1000,
  })
  @IsNumber()
  totalAmountReceived: number;
}
