import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import valid from 'card-validator';
import { Card } from './card.entity';

import type { RegisterCardDto } from './card.dto';
import { UserService } from '../user/user.service';
import type { JwtUserDto } from '../user/user.dto';
import type { CreditCardBrand } from './dtos/types';
import {
  CC_NUMBER_LENGTH,
  mastercardPrefixes,
  visaPrefixes,
} from '../lib/utils/constants';

// import { JwtConfigService } from '../jwt/jwt.service';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card) private cardRepository: Repository<Card>,
    // private customerService: CustomerService,
    private userService: UserService, // private jwtConfigService: JwtConfigService,
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

    let cardNumber = this.generateCardNumber(cardInfos.brand);
    let cvv = this.generateCVV();
    let card = await this.cardRepository.findOne({
      where: { cc_number: cardNumber, cvv },
    });

    while (card) {
      cardNumber = this.generateCardNumber(cardInfos.brand as CreditCardBrand);
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

  private getPrefixes(brand: CreditCardBrand) {
    switch (brand) {
      case 'visa':
        return visaPrefixes;
      case 'mastercard':
        return mastercardPrefixes;
      default:
        return [];
    }
  }

  // TODO: make it private
  public generateCardNumber(brand: string) {
    const prefixes = this.getPrefixes(brand as CreditCardBrand);
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const numberWithPrefix = prefix + this.generateRandomNumber(prefix.length);
    const checksum1 = this.calculateLuhnChecksum(numberWithPrefix);
    const checksum2 = this.calculateChecksum(numberWithPrefix);
    console.log({ checksum1, checksum2 });
    return numberWithPrefix + checksum2.toString();
  }

  private generateRandomNumber(prefixLength: number) {
    const length = CC_NUMBER_LENGTH - prefixLength;
    let cardNumber = '';

    while (cardNumber.length < length - 1) {
      cardNumber += Math.floor(Math.random() * 10);
    }

    return cardNumber;
  }

  private calculateChecksum(cardNumber: string): number {
    const reversedCardNumberArray = cardNumber.split('').reverse();
    let sum = 0;
    for (let i = 1; i < reversedCardNumberArray.length; i++) {
      sum +=
        Number(reversedCardNumberArray[i]) +
        Number(reversedCardNumberArray[i - 1]);
    }

    return ((Math.floor(sum / 10) + 1) * 10 - sum) % 10;
  }

  private calculateLuhnChecksum(cardNumber: string): number {
    const reversedCardNumberArray = cardNumber.split('').reverse();
    let sum = 0;
    for (let i = 0; i < reversedCardNumberArray.length; i++) {
      let digit = Number(reversedCardNumberArray[i]);
      if (i % 2 === 1) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
    }
    return (sum * 9) % 10;
  }

  validateCardNumber(cardNumber: string) {
    // const checksum = Number(cardNumber.at(-1));
    // const calculatedChecksum = this.calculateLuhnChecksum(cardNumber);
    // const isValid = checksum === calculatedChecksum;
    // console.log({ checksum, calculatedChecksum, isValid });
    const numVal = valid.number(cardNumber);
    console.log({ numVal });

    if (!numVal.isPotentiallyValid) {
      throw new BadRequestException('Invalid card number');
    }

    return {
      message: 'Card number is valid',
      // providedCardChecksum: checksum,
      // calculatedCardChecksum: calculatedChecksum,
    };
  }
}
