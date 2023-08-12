import { Controller, Delete, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/role.decorator';
import { UserId } from '../common/decorators/user.decorator';
import { User } from './user.entity';

@UseGuards(LocalAuthGuard)
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
