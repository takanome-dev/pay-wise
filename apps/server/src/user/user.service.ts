import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { User } from './user.entity';

import type { RegisterUserDto } from '../auth/auth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findAll() {
    // TODO: add params to include relations
    return this.userRepository.find();
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

  findByUsername(username: string) {
    return this.userRepository.findOne({
      where: {
        username,
      },
    });
  }

  async create(userInfos: RegisterUserDto) {
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

  // deleteAll() {
  //   return this.userRepository.delete({});
  // }
}
