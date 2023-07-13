import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { User, UserId } from '../lib/decorators/user.decorator';
import { CardService } from './card.service';

import { RegisterCardDto } from './card.dto';
import { JwtUserDto } from '../user/user.dto';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { RolesGuard } from '../lib/guards/roles.guard';

@UseGuards(LocalAuthGuard, RolesGuard)
@Controller('cards')
export class CardController {
  constructor(private cardService: CardService) {}

  @Get()
  getCards(@User() user: JwtUserDto) {
    return this.cardService.getCards(user);
  }

  @Post('user')
  createUserCard(@Body() cardInfos: RegisterCardDto, @UserId() id: string) {
    return this.cardService.createUserCard(cardInfos, id);
  }

  @Delete(':id')
  deleteCard(@Param('id') id: string) {
    return this.cardService.deleteCard(id);
  }
}
