import { Body, Controller, Post } from '@nestjs/common';

import type { LoginUserDto, RegisterUserDto } from './auth.dto';
import type { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async signIn(@Body() signInDto: LoginUserDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('register')
  async signUp(@Body() signUpDto: RegisterUserDto) {
    return this.authService.signUp(signUpDto);
  }
}
