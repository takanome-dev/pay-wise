import { Controller, Delete, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Roles } from '../lib/decorators/role.decorator';
import { RolesGuard } from '../lib/guards/roles.guard';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserId } from '../lib/decorators/user.decorator';

@Controller('users')
@ApiTags('User service')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({
    operationId: 'getAllUsers',
    summary: 'Get all users',
  })
  @ApiOkResponse({ type: User, isArray: true })
  async getUsers() {
    return this.userService.findAll();
  }

  // TODO: return all user's infos (logic in service)
  @Get('/me')
  @ApiBearerAuth()
  @ApiOperation({
    operationId: 'getMe',
    summary: 'Get current user',
  })
  @ApiOkResponse({ type: User })
  async getMe(@UserId() userId: string) {
    return this.userService.findCurrentUser(userId);
  }

  // @Post()
  // async createUser(@Body() userInfos: RegisterUserDto) {
  //   return this.userService.create(userInfos);
  // }

  // @Patch()
  // @UseGuards(RolesGuard)
  // async updateUser(@Body() userInfos: UpdateUserDto, @UserId() userId: string) {
  //   return await this.userService.update(userInfos, userId);
  // }

  @Delete()
  @Roles('admin')
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({
    operationId: 'deleteAllUsers',
    summary: 'Delete all users',
  })
  async deleteAllUsers() {
    return this.userService.deleteAll();
  }
}
