import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Card } from './card.entity';

import type { RegisterUserCardDto } from './card.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card) private cardRepository: Repository<Card>,
    // private customerService: CustomerService,
    private userService: UserService, // private jwtConfigService: JwtConfigService,
  ) {}

  getCards() {
    return this.cardRepository.find();
  }

  async createUserCard(cardInfos: RegisterUserCardDto, userId: string) {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    console.log({ cardInfos, userId });

    return {
      message: 'Card created successfully',
    };
    // let cardNumber = this.generateCardNumber();
    // let cvv = this.generateCVV();
    // let card = await this.cardRepository.findOne({
    //   where: { cc_number: cardNumber, cvv },
    // });

    // while (card) {
    //   cardNumber = this.generateCardNumber();
    //   cvv = this.generateCVV();
    //   card = await this.cardRepository.findOne({
    //     where: { cc_number: cardNumber, cvv },
    //   });
    // }

    // const { exp_month, exp_year } = this.generateExpiryDate();
    // // const hashedPin = await this.jwtConfigService.bcryptHash(cardInfos.pin);

    // try {
    //   const result = await Promise.all([
    //     await this.jwtConfigService.encrypt(cardNumber),
    //     await this.jwtConfigService.encrypt(cvv),
    //   ]);

    //   const newCard = this.cardRepository.create({
    //     ...cardInfos,
    //     cc_number: result[0],
    //     cvv: result[1],
    //     exp_month,
    //     exp_year,
    //     user,
    //     status: 'active'
    //   });

    //   return await this.cardRepository.save(newCard);
    // } catch (error) {
    //   throw new InternalServerErrorException(
    //     'An unexpected error occurred, please try again later',
    //   );
    // }
  }
  // async createUserCard(cardInfos: RegisterUserCardDto, userId: string) {
  //   const customer = await this.customerService.findById(userId);

  //   if (!customer) {
  //     throw new NotFoundException('Customer not found');
  //   }

  //   let cardNumber = this.generateCardNumber();
  //   let cvv = this.generateCVV();
  //   let card = await this.cardRepository.findOne({
  //     where: { cc_number: cardNumber, cvv },
  //   });

  //   while (card) {
  //     cardNumber = this.generateCardNumber();
  //     cvv = this.generateCVV();
  //     card = await this.cardRepository.findOne({
  //       where: { cc_number: cardNumber, cvv },
  //     });
  //   }

  //   const { exp_month, exp_year } = this.generateExpiryDate();
  //   const hashedPin = await this.jwtConfigService.bcryptHash(cardInfos.pin);

  //   try {
  //     const result = await Promise.all([
  //       await this.jwtConfigService.encrypt(cardNumber),
  //       await this.jwtConfigService.encrypt(cvv),
  //     ]);

  //     const newCard = this.cardRepository.create({
  //       ...cardInfos,
  //       cc_number: result[0],
  //       cvv: result[1],
  //       pin: hashedPin,
  //       exp_month,
  //       exp_year,
  //       customer,
  //     });

  //     return await this.cardRepository.save(newCard);
  //   } catch (error) {
  //     throw new InternalServerErrorException(
  //       'An unexpected error occurred, please try again later',
  //     );
  //   }
  // }

  // private generateCardNumber() {
  //   const randomNumber = Math.floor(Math.random() * 1_000_000_000_000);
  //   const cardNumber = `4${randomNumber.toString().padStart(15, '0')}`;
  //   return cardNumber;
  // }

  // private generateCVV() {
  //   const randomNumber = Math.floor(Math.random() * 1000);
  //   const cvv = randomNumber.toString().padStart(3, '0');
  //   return cvv;
  // }

  // private generateExpiryDate() {
  //   const currentDate = new Date();
  //   const expiryDate = new Date(
  //     currentDate.setMonth(currentDate.getMonth() + 3),
  //   );

  //   const expiryMonth = expiryDate.getMonth() + 1;
  //   const expiryYear = expiryDate.getFullYear();
  //   return {
  //     exp_month: expiryMonth,
  //     exp_year: expiryYear,
  //   };
  // }
}
