import { PickType } from '@nestjs/mapped-types';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  id_type: string;

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
  country_code: string;

  @IsString()
  zip_code: string;

  @IsString()
  address: string;

  @IsString()
  image: string;
}
