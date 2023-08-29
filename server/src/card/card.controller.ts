import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  PickType,
} from '@nestjs/swagger';
import { SupabaseAuthUser } from 'nestjs-supabase-auth';

import { SupabaseGuard } from '../auth/guards/supabase.guard';
import { User, UserId } from '../common/decorators/user.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

import { RegisterCardDto } from './card.dto';
import { Card } from './card.entity';
import { CardService } from './card.service';

@UseGuards(SupabaseGuard, RolesGuard)
@Controller('cards')
@ApiTags('Card service')
export class CardController {
  constructor(private cardService: CardService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({
    operationId: 'getCards',
    summary: 'Get all cards',
  })
  @ApiOkResponse({ type: Card, isArray: true })
  getCards(@User() user: SupabaseAuthUser) {
    console.log({ user });
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
