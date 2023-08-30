import { Controller, Delete, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { SupabaseGuard } from '../auth/guards/supabase.guard';
import { Roles } from '../common/decorators/role.decorator';
import { UserId } from '../common/decorators/user.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

import { User } from './user.entity';
import { UserService } from './user.service';
import { KPIDto } from './user.dto';

@UseGuards(SupabaseGuard, RolesGuard)
@Controller('users')
@ApiTags('User service')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({
    operationId: 'getAllUsers',
    summary: 'Get all users data',
  })
  @ApiOkResponse({ type: User, isArray: true })
  getUsers() {
    return this.userService.findAll();
  }

  @Get('/me')
  @ApiBearerAuth()
  @ApiOperation({
    operationId: 'getMe',
    summary: 'Get current user',
  })
  @ApiOkResponse({ type: User })
  getMe(@UserId() userId: string) {
    return this.userService.findCurrentUser(userId);
  }

  @Get('/kpis/user')
  @ApiBearerAuth()
  @ApiOperation({
    operationId: 'getKPIs',
    summary: 'Get KPIs data',
  })
  @ApiOkResponse({ type: KPIDto })
  getKPIs(@UserId() userId: string) {
    return this.userService.getUserKPIs(userId);
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
  deleteAllUsers() {
    return this.userService.deleteAll();
  }
}
