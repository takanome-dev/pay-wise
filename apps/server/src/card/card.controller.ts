import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  // UseGuards,
} from '@nestjs/common';

// import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { Roles } from '../lib/decorators/role.decorator';
import { User, UserId } from '../lib/decorators/user.decorator';
// import { RolesGuard } from '../lib/guards/roles.guard';
import { CardService } from './card.service';

import { GenerateCardDto, RegisterCardDto, ValidateCardDto } from './card.dto';
import { JwtUserDto } from '../user/user.dto';

// @UseGuards(LocalAuthGuard, RolesGuard)
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

  @Post('generate')
  generateCard(@Body() cardInfos: GenerateCardDto) {
    return this.cardService.generateCardNumber(cardInfos.brand);
  }

  @Post('validate')
  validateCard(@Body() cardInfos: ValidateCardDto) {
    return this.cardService.validateCardNumber(cardInfos.card_number);
  }

  @Delete(':id')
  deleteCard(@Param('id') id: string) {
    return this.cardService.deleteCard(id);
  }
}
