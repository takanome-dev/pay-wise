import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateCardDto, RegisterCardDto } from './card.dto';
import { CardService } from './card.service';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '../common/decorators/user.decorator';
import { User as UserEntity } from '../user/user.entity';

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
    @User() user: UserEntity,
  ) {
    return await this.cardService.createCard(cardInfos, user);
  }
}
