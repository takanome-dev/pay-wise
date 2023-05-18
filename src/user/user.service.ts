import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { LoginUserDto, RegisterUserDto } from './user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  findUsers() {
    return this.usersRepository.find({
      relations: {
        cards: true,
      },
    });
  }

  registerUser(userInfos: RegisterUserDto) {
    const newUser = this.usersRepository.create(userInfos);
    return this.usersRepository.save(newUser);
  }

  async loginUser(userInfos: LoginUserDto) {
    const foundUser = await this.usersRepository.findOne({
      where: {
        email: userInfos.email,
      },
    });

    if (!foundUser) {
      throw new NotFoundException('User not found');
    }

    return foundUser;
  }
}
