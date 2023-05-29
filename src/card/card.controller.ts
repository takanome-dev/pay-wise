import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RegisterCardDto } from './card.dto';
import { CardService } from './card.service';
import { User } from '../common/decorators/user.decorator';
import { JwtUserDto } from '../user/user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/role.decorator';

@Roles('customer')
@UseGuards(AuthGuard, RolesGuard)
@Controller('cards')
export class CardController {
  constructor(private cardService: CardService) {}

  @Get()
  async getCards() {
    return await this.cardService.getCards();
  }

  @Post()
  async createCard(
    @Body() cardInfos: RegisterCardDto,
    @User() user: JwtUserDto,
  ) {
    // return await this.cardService.createCard(cardInfos, user);
    // TODO: user should create a customer first and then send the customer id
  }
}
