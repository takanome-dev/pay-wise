import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import { RegisterUserDto } from '../auth/auth.dto';
import { Roles } from '../common/decorators/role.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { UpdateUserDto } from './user.dto';
import { UserId } from '../common/decorators/user.decorator';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @Roles('admin')
  @UseGuards(AuthGuard, RolesGuard)
  async getUsers() {
    return await this.userService.findAll();
  }

  @Post()
  async createUser(@Body() userInfos: RegisterUserDto) {
    return await this.userService.create(userInfos);
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
    return await this.userService.deleteAll();
  }
}
