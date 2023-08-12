import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SupabaseAuthUser } from 'nestjs-supabase-auth';

import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  PickType,
} from '@nestjs/swagger';
import { CardService } from './card.service';
import { RegisterCardDto } from './card.dto';
import { RolesGuard } from '../common/guards/roles.guard';
import { User, UserId } from '../common/decorators/user.decorator';
import { Card } from './card.entity';

import { RegisterCardDto } from './card.dto';
import { JwtUserDto } from '../user/user.dto';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { RolesGuard } from '../lib/guards/roles.guard';

@UseGuards(LocalAuthGuard, RolesGuard)
@Controller('cards')
@ApiTags('Card service')
export class CardController {
  constructor(private cardService: CardService) {}

  @Get()
<<<<<<< HEAD
  getCards(@User() user: JwtUserDto) {
=======
  @ApiBearerAuth()
  @ApiOperation({
    operationId: 'getCards',
    summary: 'Get all cards',
  })
  @ApiOkResponse({ type: Card, isArray: true })
  getCards(@User() user: SupabaseAuthUser) {
    console.log({ user });
>>>>>>> fa0a7b1 (add swagger doc to server endpoints)
    return this.cardService.getCards(user);
  }

  @Post('user')
  @ApiBearerAuth()
  @ApiOperation({
    operationId: 'createUserCard',
    summary: 'Create a card for the current user',
  })
  @ApiBody({ type: PickType(Card, ['brand', 'currency']) })
  @ApiOkResponse({ type: Card })
  createUserCard(@Body() cardInfos: RegisterCardDto, @UserId() id: string) {
    return this.cardService.createUserCard(cardInfos, id);
  }

  // @Delete(':id')
  // deleteCard(@Param('id') id: string) {
  //   return this.cardService.deleteCard(id);
  // }
}
