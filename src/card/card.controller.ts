import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCardDto } from './card.dto';
import { CardService } from './card.service';

@Controller('cards')
export class CardController {
  constructor(private cardService: CardService) {}

  @Get()
  async getCards() {
    return await this.cardService.getCards();
  }

  @Post()
  async createCard(@Body() cardInfos: CreateCardDto) {
    return await this.cardService.createCard(cardInfos);
  }
}
