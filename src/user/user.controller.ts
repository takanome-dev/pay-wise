import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import { RegisterUserDto } from '../auth/auth.dto';
import { Roles } from '../common/decorators/role.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  // @Roles('admin')
  // @UseGuards(AuthGuard, RolesGuard)
  async getUsers() {
    return await this.userService.findAll();
  }

  @Get('me')
  async getUserByEmail() {
    return await this.userService.findByEmail('test@gmail.com');
  }

  @Post()
  async createUser(@Body() userInfos: RegisterUserDto) {
    return await this.userService.create(userInfos);
  }
}
