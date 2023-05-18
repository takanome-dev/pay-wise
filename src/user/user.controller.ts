import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginUserDto, RegisterUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers() {
    return await this.userService.findUsers();
  }

  @Post('register')
  async registerUser(@Body() registerUserDto: RegisterUserDto) {
    const user = await this.userService.registerUser(registerUserDto);
    return user;
  }

  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    const user = await this.userService.loginUser(loginUserDto);
    return user;
  }
}
