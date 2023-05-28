import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RegisterCardDto } from './card.dto';
import { CardService } from './card.service';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '../common/decorators/user.decorator';
import { JwtUserDto } from '../user/user.dto';

@Controller('cards')
export class CardController {
  constructor(private cardService: CardService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getCards() {
    return await this.cardService.getCards();
  }

  @UseGuards(AuthGuard)
  @Post()
  async createCard(
    @Body() cardInfos: RegisterCardDto,
    @User() user: JwtUserDto,
  ) {
    // return await this.cardService.createCard(cardInfos, user);
    // TODO: user should create a customer first and then send the customer id
  }
}
