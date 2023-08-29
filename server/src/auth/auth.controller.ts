import { Controller, Body, Post, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';

import { RegisterUserDto } from './auth.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';

import type { User } from '../user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    return this.authService.login(req.user as User);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterUserDto) {
    return this.authService.signUp(registerDto);
  }
}
