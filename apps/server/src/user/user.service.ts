import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import type { User } from './user.entity';
import type { RegisterUserDto } from '../auth/auth.dto';
import type { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  findAllWithCustomers() {
    return this.userRepository.find({
      relations: {
        customers: true,
      },
    });
  }

  findById(id: string) {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async create(userInfos: RegisterUserDto) {
    const foundUser = await this.findByEmail(userInfos.email);

    if (foundUser) {
      throw new BadRequestException('email already in use');
    }

    const newUser = this.userRepository.create(userInfos);
    return this.userRepository.save(newUser);
  }

  // TODO: break down this method into smaller ones
  // TODO: like updatePassword, updateProfile, etc.
  // async update(userInfos: UpdateUserDto, userId: string) {
  //   const foundUser = await this.findById(userId);

  //   if (!foundUser) {
  //     throw new BadRequestException('user not found');
  //   }

  //   return this.userRepository.update(userId, {
  //     ...foundUser,
  //     ...userInfos,
  //     password: foundUser.password,
  //     role: foundUser.role,
  //     is_verified: foundUser.is_verified,
  //   });
  // }

  deleteAll() {
    return this.userRepository.delete({});
  }
}
