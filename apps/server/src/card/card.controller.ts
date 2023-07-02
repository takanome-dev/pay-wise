import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { Roles } from '../common/decorators/role.decorator';
import { User, UserId } from '../common/decorators/user.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { CardService } from './card.service';

import { RegisterCardDto } from './card.dto';
import { JwtUserDto } from '../user/user.dto';

@UseGuards(LocalAuthGuard, RolesGuard)
@Controller('cards')
export class CardController {
  constructor(private cardService: CardService) {}

  @Get()
  getCards(@User() user: JwtUserDto) {
    return this.cardService.getCards(user);
  }

  @Post('user')
  @Roles('user')
  createUserCard(@Body() cardInfos: RegisterCardDto, @UserId() id: string) {
    return this.cardService.createUserCard(cardInfos, id);
  }

  @Delete(':id')
  deleteCard(@Param('id') id: string) {
    return this.cardService.deleteCard(id);
  }
}
