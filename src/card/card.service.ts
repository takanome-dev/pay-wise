import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCardDto } from './card.dto';
import { Card } from './card.entity';
import { User } from '../user/user.entity';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card) private cardRepository: Repository<Card>,
    private userRepository: UserService,
  ) {}

  async getCards() {
    return await this.cardRepository.find();
  }

  async createCard(cardInfos: CreateCardDto) {
    const foundUser = await this.userRepository.findById(cardInfos.user_id);

    if (!foundUser) {
      throw new NotFoundException('User not found');
    }

    const newCard = this.cardRepository.create({
      ...cardInfos,
      user: foundUser,
    });

    return await this.cardRepository.save(newCard);
  }
}
