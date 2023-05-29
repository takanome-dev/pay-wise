import { OmitType } from '@nestjs/mapped-types';
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
