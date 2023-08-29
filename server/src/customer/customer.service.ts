import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Customer } from './customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerService: Repository<Customer>,
  ) {}

  baseQueryBuilder() {
    const builder = this.customerService.createQueryBuilder('customers');
    return builder;
  }

  findById(id: string) {
    return this.customerService.findOne({
      where: {
        id,
      },
    });
  }

  findByEmail(email: string) {
    return this.customerService.findOne({
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

  //   const newCustomer = this.customerService.create({
  //     ...customerInfos,
  //     user,
  //   });

  //   return this.customerService.save(newCustomer);
  // }

  getNumberOfCustomersCreated(userId: string) {
    // return this.customerService.count({
    //   where: {
    //     user: {
    //       id: userId,
    //     },
    //   },
    // });
    const queryBuilder = this.baseQueryBuilder();

    queryBuilder
      .select('COUNT(customers.id)', 'count')
      .innerJoinAndSelect('customers.user', 'user')
      .where('user.id = :userId', { userId });
    // .select('COUNT(customers.id)', 'count')
    // .innerJoin('customers.user', 'user')
    // .where('user.id = :userId', { userId });
    // .where('customers.user_id = :userId', { userId });

    return queryBuilder.getRawOne();
  }
}
