import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardController } from './card.controller';
import { Card } from './card.entity';
import { CardService } from './card.service';
import { JwtConfigModule } from '../jwt/jwt.module';
import { CustomerModule } from '../customer/customer.module';

@Module({
  imports: [CustomerModule, TypeOrmModule.forFeature([Card]), JwtConfigModule],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
