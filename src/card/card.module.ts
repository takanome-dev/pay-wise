import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardController } from './card.controller';
import { Card } from './card.entity';
import { CardService } from './card.service';
import { UserModule } from '../user/user.module';
import { JwtConfigModule } from '../jwt/jwt.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../auth/auth.guard';
import { CustomerModule } from '../customer/customer.module';

@Module({
  imports: [CustomerModule, TypeOrmModule.forFeature([Card]), JwtConfigModule],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
