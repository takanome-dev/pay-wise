import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Card } from './card.entity';

import type { RegisterCardDto } from './card.dto';
import { UserService } from '../user/user.service';
import type { JwtUserDto } from '../user/user.dto';
import { JwtConfigService } from '../jwt/jwt.service';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card) private cardRepository: Repository<Card>,
    // private customerService: CustomerService,
    private userService: UserService,
    private jwtConfigService: JwtConfigService,
  ) {}

  async getCards(user: JwtUserDto) {
    if (user.role !== 'admin') {
      const foundUser = await this.userService.findById(user.sub);

      if (!foundUser) {
        throw new NotFoundException('User not found');
      }

      return this.cardRepository.find({ where: { user: foundUser } });
    }

    return this.cardRepository.find();
  }

  async createUserCard(cardInfos: RegisterCardDto, userId: string) {
    // TODO: check total cards per user (max 3)
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // TODO: check if user is verified (email verified)

    let cardNumber = this.generateCardNumber();
    let cvv = this.generateCVV();
    let card = await this.cardRepository.findOne({
      where: { cc_number: cardNumber, cvv },
    });

    while (card) {
      cardNumber = this.generateCardNumber();
      cvv = this.generateCVV();
      card = await this.cardRepository.findOne({
        where: { cc_number: cardNumber, cvv },
      });
    }

    const { exp_month, exp_year } = this.generateExpiryDate();

    try {
      // const result = await Promise.all([
      //   await this.jwtConfigService.encrypt(cardNumber),
      //   await this.jwtConfigService.encrypt(cvv),
      // ]);

      const newCard = this.cardRepository.create({
        ...cardInfos,
        cc_number: cardNumber,
        cvv,
        exp_month,
        exp_year,
        user,
      });

      await this.cardRepository.save(newCard);
      return {
        data: null,
        message: 'Card created successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'An unexpected error occurred, please try again later',
      );
    }
  }

  async deleteCard(id: string) {
    const card = await this.cardRepository.findOne({
      where: { id },
    });

    if (!card) {
      throw new NotFoundException('Card not found');
    }

    await this.cardRepository.softDelete(id);

    return {
      data: null,
      message: 'Card deleted successfully',
    };
  }

  private generateCardNumber() {
    const randomNumber = Math.floor(Math.random() * 1_000_000_000_000);
    const cardNumber = `4${randomNumber.toString().padStart(15, '0')}`;
    return cardNumber;
  }

  private generateCVV() {
    const randomNumber = Math.floor(Math.random() * 1_000);
    const cvv = randomNumber.toString().padStart(3, '0');
    return cvv;
  }

  private generateExpiryDate() {
    const currentDate = new Date();
    const expiryDate = new Date(
      currentDate.setMonth(currentDate.getMonth() + 3),
    );

    const expiryMonth = expiryDate.getMonth() + 1;
    const expiryYear = expiryDate.getFullYear();
    return {
      exp_month: expiryMonth,
      exp_year: expiryYear,
    };
  }
}
