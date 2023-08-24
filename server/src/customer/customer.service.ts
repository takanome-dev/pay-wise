import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// import { UserService } from '../user/user.service';
import { Customer } from './customer.entity';

// import type { CreateCustomerDto } from './customer.dto';

/**
 *
 */
@Injectable()
export class CustomerService {
  /**
   *
   * @param customerRepository
   */
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>, // private userService: UserService,
  ) {}

  /**
   *
   * @param id
   */
  findById(id: string) {
    return this.customerRepository.findOne({
      where: {
        id,
      },
    });
  }

  /**
   *
   * @param email
   */
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
}
