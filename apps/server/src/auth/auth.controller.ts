import { Controller, Body, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

import { LoginUserDto, RegisterUserDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginUserDto) {
    return this.authService.signIn(loginDto);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterUserDto) {
    return this.authService.signUp(registerDto);
  }
}
