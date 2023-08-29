import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import valid from 'card-validator';
import { Repository } from 'typeorm';

import {
  CC_NUMBER_LENGTH,
  mastercardPrefixes,
  visaPrefixes,
} from '../common/utils/constants';
import { UserService } from '../user/user.service';

import { Card } from './card.entity';

import type { RegisterCardDto } from './card.dto';
import type { CreditCardBrand } from './dtos/types';
import type { SupabaseAuthUser } from 'nestjs-supabase-auth';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card) private cardRepository: Repository<Card>,
    private userService: UserService,
  ) {}

  getCards(user: SupabaseAuthUser) {
    return this.cardRepository.find({
      where: { user: { id: user.id } },
    });
  }

  findById(id: string) {
    return this.cardRepository.findOne({
      where: { id },
    });
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
      // eslint-disable-next-line no-await-in-loop
      card = await this.cardRepository.findOne({
        where: { cc_number: cardNumber, cvv },
      });
    }

    const { exp_month, exp_year } = this.generateExpiryDate();

    try {
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
        data: newCard,
        message: 'Card created successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'An unexpected error occurred, please try again later',
      );
    }
  }

  updateBalance(id: string, amount: number) {
    return this.cardRepository.update(id, { balance: amount });
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

  private generateCardNumber(brand: string) {
    const prefixes = this.getPrefixes(brand as CreditCardBrand);
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const numberWithPrefix = prefix + this.generateRandomNumber(prefix.length);
    const checksum = this.calculateLuhnChecksum(numberWithPrefix);
    return numberWithPrefix + checksum.toString();
  }

  private generateRandomNumber(prefixLength: number) {
    const length = CC_NUMBER_LENGTH - prefixLength;
    let cardNumber = '';

    while (cardNumber.length < length - 1) {
      cardNumber += Math.floor(Math.random() * 10);
    }

    return cardNumber;
  }

  // private calculateChecksum(cardNumber: string): number {
  //   const reversedCardNumberArray = cardNumber.split('').reverse();
  //   let sum = 0;
  //   for (let i = 1; i < reversedCardNumberArray.length; i++) {
  //     sum +=
  //       Number(reversedCardNumberArray[i]) +
  //       Number(reversedCardNumberArray[i - 1]);
  //   }

  //   return ((Math.floor(sum / 10) + 1) * 10 - sum) % 10;
  // }

  private calculateLuhnChecksum(cardNumber: string) {
    const reversedCardNumberArray = cardNumber.split('').reverse();
    let sum = 0;
    // eslint-disable-next-line no-plusplus
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
    const numVal = valid.number(cardNumber);
    return numVal.isPotentiallyValid;
  }
}
