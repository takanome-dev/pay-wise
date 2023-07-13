import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';

import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { Roles } from '../lib/decorators/role.decorator';
import { RolesGuard } from '../lib/guards/roles.guard';

import { UserService } from './user.service';
import { RegisterUserDto } from '../auth/auth.dto';

@UseGuards(LocalAuthGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @Roles('admin')
  @UseGuards(RolesGuard)
  async getUsers() {
    return this.userService.findAll();
  }

  @Post()
  async createUser(@Body() userInfos: RegisterUserDto) {
    return this.userService.create(userInfos);
  }

  // @Patch()
  // @UseGuards(RolesGuard)
  // async updateUser(@Body() userInfos: UpdateUserDto, @UserId() userId: string) {
  //   return await this.userService.update(userInfos, userId);
  // }

  @Delete()
  @Roles('admin')
  @UseGuards(RolesGuard)
  async deleteAllUsers() {
    return this.userService.deleteAll();
  }
}
