import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '../common/decorators/user.decorator';
import { CompleteKYCDto, JwtUserDto } from '../user/user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getUsers() {
    return await this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Post('kyc')
  async completeKyc(
    @Body() kycInfos: CompleteKYCDto,
    @User() user: JwtUserDto,
  ) {
    return await this.userService.completeKyc(kycInfos, user);
  }
}
