import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  findUsers() {
    return this.usersRepository.find();
  }

  createUser(userInfos: CreateUserDto) {
    const newUser = this.usersRepository.create({
      ...userInfos,
      created_at: new Date(),
    });
    return this.usersRepository.save(newUser);
  }
}
