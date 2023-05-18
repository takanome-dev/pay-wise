import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCardDto } from './card.dto';
import { Card } from './card.entity';
import { User } from '../user/user.entity';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card) private cardRepository: Repository<Card>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getCards() {
    return await this.cardRepository.find();
  }

  async createCard(cardInfos: CreateCardDto) {
    const foundUser = await this.userRepository.findOne({
      where: {
        id: Number(cardInfos.user_id),
      },
    });

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
