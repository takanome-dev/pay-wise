import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Customer } from './customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  findById(id: string) {
    return this.customerRepository.findOne({
      where: {
        id,
      },
    });
  }

  findByEmail(email: string) {
    return this.customerRepository.findOne({
      where: {
        email,
      },
    });
  }

  // async create(customerInfos: CreateCustomerDto, userId: string) {
  //   const user = await this.userService.findById(userId);

  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }

  //   const newCustomer = this.customerRepository.create({
  //     ...customerInfos,
  //     user,
  //   });

  //   return this.customerRepository.save(newCustomer);
  // }

  getNumberOfCustomersCreated(userId: string) {
    return this.customerRepository.count({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }
}