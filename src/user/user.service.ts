import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from '../auth/auth.dto';

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

  create(userInfos: RegisterUserDto) {
    const newUser = this.userRepository.create(userInfos);
    return this.userRepository.save(newUser);
  }
}
