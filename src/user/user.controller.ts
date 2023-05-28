import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  // TODO: only admins should be able to get all users
  @UseGuards(AuthGuard)
  @Get()
  async getUsers() {
    return await this.userService.findAll();
  }
}
