import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto, RegisterUserDto } from '../auth/auth.dto';
import { AuthService } from '../auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async signIn(@Body() signInDto: LoginUserDto) {
    return await this.authService.signIn(signInDto);
  }

  @Post('register')
  async signUp(@Body() signUpDto: RegisterUserDto) {
    return await this.authService.signUp(signUpDto);
  }
}
