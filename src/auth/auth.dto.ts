import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from '../user/user.dto';

export class RegisterUserDto extends PickType(CreateUserDto, [
  'username',
  'email',
  'password',
] as const) {}

export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
] as const) {}
