import { OmitType, PickType } from '@nestjs/mapped-types';
import { IsEmail, IsIn, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsIn(['NIN', 'PASSPORT', 'DRIVER_LICENSE'])
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
  zip_code: string;

  @IsString()
  address: string;

  @IsString()
  image_url: string;

  @IsString()
  front_id_card_url: string;

  @IsString()
  back_id_card_url: string;
}

export class CompleteKYCDto extends OmitType(CreateUserDto, [
  'username',
  'email',
  'password',
] as const) {}

export class JwtUserDto {
  @IsString()
  sub: string;

  @IsString()
  email: string;

  @IsNumber()
  iat: number;

  @IsNumber()
  exp: number;
}
