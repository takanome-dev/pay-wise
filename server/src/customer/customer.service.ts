import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserService } from '../user/user.service';

import { type CreateCustomerDto } from './customer.dto';
import { Customer } from './customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerService: Repository<Customer>,
    private readonly userService: UserService,
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

  async create(customerInfos: CreateCustomerDto, userId: string) {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const newCustomer = this.customerService.create({
      ...customerInfos,
      user,
    });

    return this.customerService.save(newCustomer);
  }

  async getKpis(userId: string) {
    const queryBuilder = this.baseQueryBuilder();

    queryBuilder.select('*').where('customers.user_id = :userId', { userId });

    const [itemCount, entities] = await Promise.all([
      queryBuilder.getCount(),
      queryBuilder.getRawMany(),
    ]);

    return {
      totalCustomers: itemCount,
      customers: entities,
    };
  }
}
