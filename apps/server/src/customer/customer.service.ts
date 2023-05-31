import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import type { CreateCustomerDto } from './customer.dto';
import type { Customer } from './customer.entity';
import type { UserService } from '../user/user.service';
import type { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    private userService: UserService,
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

  async create(customerInfos: CreateCustomerDto, userId: string) {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const newCustomer = this.customerRepository.create({
      ...customerInfos,
      user,
    });

    return this.customerRepository.save(newCustomer);
  }
}
