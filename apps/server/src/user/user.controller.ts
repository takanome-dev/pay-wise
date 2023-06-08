import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../common/decorators/role.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

import { UserService } from './user.service';
import { RegisterUserDto } from '../auth/auth.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @Roles('admin')
  @UseGuards(AuthGuard, RolesGuard)
  async getUsers() {
    return this.userService.findAll();
  }

  @Post()
  async createUser(@Body() userInfos: RegisterUserDto) {
    return this.userService.create(userInfos);
  }

  // @Patch()
  // @Roles('user', 'admin')
  // @UseGuards(AuthGuard, RolesGuard)
  // async updateUser(@Body() userInfos: UpdateUserDto, @UserId() userId: string) {
  //   return await this.userService.update(userInfos, userId);
  // }

  @Delete()
  @Roles('admin')
  @UseGuards(AuthGuard, RolesGuard)
  async deleteAllUsers() {
    return this.userService.deleteAll();
  }
}
