import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { Roles } from '../common/decorators/role.decorator';
import { User } from '../common/decorators/user.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { CardService } from './card.service';

import { RegisterCardDto } from './card.dto';
import { JwtUserDto } from '../user/user.dto';

@Roles('customer')
@UseGuards(LocalAuthGuard, RolesGuard)
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
