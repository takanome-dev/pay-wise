import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCardDto, RegisterCardDto } from './card.dto';
import { Card } from './card.entity';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { hashPassword } from '../common/utils/bcrypt';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card) private cardRepository: Repository<Card>,
    private userService: UserService,
  ) {}

  async getCards() {
    return await this.cardRepository.find();
  }

  // async createCard(cardInfos: CreateCardDto) {
  //   const foundUser = await this.userService.findById(cardInfos.user_id);

  //   if (!foundUser) {
  //     throw new NotFoundException('User not found');
  //   }

  //   const newCard = this.cardRepository.create({
  //     ...cardInfos,
  //     user: foundUser,
  //   });

  //   return await this.cardRepository.save(newCard);
  // }

  async createCard(cardInfos: RegisterCardDto, user: User) {
    const foundUser = await this.userService.findById(user.id);

    if (!foundUser) {
      throw new NotFoundException('User not found');
    }

    // TODO: check if the user is verified (completed the KYC process)
    // TODO:

    let cardNumber = this.generateCardNumber();
    let cvv = this.generateCVV();
    let card = await this.cardRepository.findOne({
      where: { card_number: cardNumber, card_cvv: cvv },
    });

    while (card) {
      cardNumber = this.generateCardNumber();
      cvv = this.generateCVV();
      card = await this.cardRepository.findOne({
        where: { card_number: cardNumber, card_cvv: cvv },
      });
    }

    const expiryDate = this.generateExpiryDate();
    const hashedPin = await hashPassword(cardInfos.card_pin);

    console.log({
      cardNumber,
      cvv,
      expiryDate,
      hashedPin,
    });

    // const newCard = this.cardRepository.create({
    //   ...cardInfos,
    //   card_number: cardNumber,
    //   card_cvv: cvv,
    //   user: foundUser,
    // });

    // return await this.cardRepository.save(newCard);
    return { message: 'Card created successfully' };
  }

  private generateCardNumber() {
    const randomNumber = Math.floor(Math.random() * 1_000_000_000_000);
    const cardNumber = `4${randomNumber.toString().padStart(15, '0')}`;
    return cardNumber;
  }

  private generateCVV() {
    const randomNumber = Math.floor(Math.random() * 1000);
    const cvv = randomNumber.toString().padStart(3, '0');
    return cvv;
  }

  private generateExpiryDate() {
    const currentDate = new Date();
    const expiryDate = new Date(
      currentDate.setMonth(currentDate.getMonth() + 3),
    );

    const expiryMonth = expiryDate.getMonth() + 1;
    const expiryYear = `${expiryDate.getFullYear()}`.slice(2);
    return `${expiryMonth}/${expiryYear}`;
  }
}
