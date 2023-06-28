import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { Roles } from '../common/decorators/role.decorator';
import { UserId } from '../common/decorators/user.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { CardService } from './card.service';

import { RegisterUserCardDto } from './card.dto';

@UseGuards(LocalAuthGuard, RolesGuard)
@Controller('cards')
export class CardController {
  constructor(private cardService: CardService) {}

  @Get()
  getCards() {
    return this.cardService.getCards();
  }

  @Post('user')
  @Roles('user')
  createUserCard(@Body() cardInfos: RegisterUserCardDto, @UserId() id: string) {
    return this.cardService.createUserCard(cardInfos, id);
  }
}
