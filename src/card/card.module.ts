import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardController } from './card.controller';
import { Card } from './card.entity';
import { CardService } from './card.service';
import { UserService } from '../user/user.service';
import { UserController } from '../user/user.controller';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Card, User])],
  controllers: [CardController, UserController],
  providers: [CardService, UserService],
})
export class CardModule {}
