import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../common/decorators/role.decorator';
import { User } from '../common/decorators/user.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { CardService } from './card.service';

import type { RegisterCardDto } from './card.dto';
import type { JwtUserDto } from '../user/user.dto';

@Roles('customer')
@UseGuards(AuthGuard, RolesGuard)
@Controller('cards')
export class CardController {
  constructor(private cardService: CardService) {}

  @Get()
  async getCards() {
    return this.cardService.getCards();
  }

  @Post()
  createCard(@Body() cardInfos: RegisterCardDto, @User() user: JwtUserDto) {
    console.log({ cardInfos, user });
    // return await this.cardService.createCard(cardInfos, user);
    // TODO: user should create a customer first and then send the customer id
  }
}
