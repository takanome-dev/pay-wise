import { BadRequestException, Injectable } from '@nestjs/common';

import { JwtConfigService } from '../jwt/jwt.service';
import { UserService } from '../user/user.service';

import type { LoginUserDto, RegisterUserDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtConfigService: JwtConfigService,
  ) {}

  async signIn(userInfos: LoginUserDto) {
    const user = await this.userService.findByEmail(userInfos.email);

    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    const isPasswordValid = await this.jwtConfigService.bcryptCompare(
      userInfos.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid email or password');
    }

    // const payload = { sub: user.id, email: user.email, role: user.role };

    // return {
    //   access_token: await this.jwtConfigService.signAsync(payload),
    // };
    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    };
  }

  async signUp(userInfos: RegisterUserDto) {
    const foundUserByMail = await this.userService.findByEmail(userInfos.email);

    if (foundUserByMail) {
      throw new BadRequestException('Email already in use, try another one');
    }

    const foundUserByUsername = await this.userService.findByUsername(
      userInfos.username,
    );

    if (foundUserByUsername) {
      throw new BadRequestException('Username already taken, try another one');
    }

    const hashedPassword = await this.jwtConfigService.bcryptHash(
      userInfos.password,
    );

    const newUser = await this.userService.create({
      ...userInfos,
      password: hashedPassword,
    });

    // const payload = {
    //   sub: newUser.id,
    //   email: newUser.email,
    //   role: newUser.role,
    // };

    // return {
    //   access_token: await this.jwtConfigService.signAsync(payload),
    // };
    return {
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    };
  }
}
