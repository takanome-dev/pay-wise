import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';

// import { Repository } from 'typeorm';
// // import { User } from './user.entity';

// import type { RegisterUserDto } from '../auth/auth.dto';

export type User = any;

@Injectable()
export class UserService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
  // constructor(
  //   @InjectRepository(User) private userRepository: Repository<User>,
  // ) {}
  // findAll() {
  //   return this.userRepository.find();
  // }

  // findAllWithCustomers() {
  //   return this.userRepository.find({
  //     relations: {
  //       customers: true,
  //     },
  //   });
  // }

  // findById(id: string) {
  //   return this.userRepository.findOne({
  //     where: {
  //       id,
  //     },
  //   });
  // }

  // findByEmail(email: string) {
  //   return this.userRepository.findOne({
  //     where: {
  //       email,
  //     },
  //   });
  // }

  // async create(userInfos: RegisterUserDto) {
  //   const foundUser = await this.findByEmail(userInfos.email);

  //   if (foundUser) {
  //     throw new BadRequestException('email already in use');
  //   }

  //   const newUser = this.userRepository.create(userInfos);
  //   return this.userRepository.save(newUser);
  // }

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
