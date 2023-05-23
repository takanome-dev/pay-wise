import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from 'src/auth/auth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  findAll() {
    return this.usersRepository.find({
      relations: {
        cards: true,
      },
    });
  }

  findById(id: string) {
    return this.usersRepository.findOne({
      where: {
        id,
      },
    });
  }

  findByEmail(email: string) {
    return this.usersRepository.findOne({
      where: {
        email,
      },
    });
  }

  create(userInfos: RegisterUserDto) {
    const newUser = this.usersRepository.create(userInfos);
    return this.usersRepository.save(newUser);
  }
}
