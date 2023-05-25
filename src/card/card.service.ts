import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RegisterCardDto } from './card.dto';
import { Card } from './card.entity';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { JwtConfigService } from '../jwt/jwt.service';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card) private cardRepository: Repository<Card>,
    private userService: UserService,
    private jwtConfigService: JwtConfigService,
  ) {}

  async getCards() {
    return await this.cardRepository.find();
  }

  async createCard(cardInfos: RegisterCardDto, user: User) {
    const foundUser = await this.userService.findById(user.id);

    if (!foundUser) {
      throw new NotFoundException('User not found');
    }

    // TODO: check if the user is verified (completed the KYC process)

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
    const hashedPin = await this.jwtConfigService.bcryptHash(
      cardInfos.card_pin,
    );

    try {
      const result = await Promise.all([
        await this.jwtConfigService.encrypt(cardNumber),
        await this.jwtConfigService.encrypt(cvv),
      ]);

      const newCard = this.cardRepository.create({
        ...cardInfos,
        card_number: result[0],
        card_cvv: result[1],
        card_pin: hashedPin,
        expiry_date: expiryDate,
        user: foundUser,
      });

      return await this.cardRepository.save(newCard);
    } catch (error) {
      throw new InternalServerErrorException(
        'An unexpected error occurred, please try again later',
      );
    }
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
