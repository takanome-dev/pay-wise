import { Injectable } from '@nestjs/common';

import { JwtConfigService } from '../jwt/jwt.service';
import { UserService } from '../user/user.service';

// import type { LoginUserDto, RegisterUserDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtConfigService: JwtConfigService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user = await this.userService.findOne(username);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { password, ...result } = user;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return result;
    }
    return null;
  }

  async login(user: any) {
    // eslint-disable-next-line max-len
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: await this.jwtConfigService.signAsync(payload),
    };
  }

  // async signIn(userInfos: LoginUserDto) {
  //   const user = await this.userService.findByEmail(userInfos.email);

  //   if (!user) {
  //     throw new BadRequestException('Invalid credentials');
  //   }

  //   const isPasswordValid = await this.jwtConfigService.bcryptCompare(
  //     userInfos.password,
  //     user.password,
  //   );

  //   if (!isPasswordValid) {
  //     throw new BadRequestException('Invalid credentials');
  //   }

  //   const payload = { sub: user.id, email: user.email, role: user.role };

  //   return {
  //     access_token: await this.jwtConfigService.signAsync(payload),
  //   };
  // }

  // async signUp(userInfos: RegisterUserDto) {
  //   const hashedPassword = await this.jwtConfigService.bcryptHash(
  //     userInfos.password,
  //   );

  //   const newUser = await this.userService.create({
  //     ...userInfos,
  //     password: hashedPassword,
  //   });

  //   const payload = {
  //     sub: newUser.id,
  //     email: newUser.email,
  //     role: newUser.role,
  //   };

  //   return {
  //     access_token: await this.jwtConfigService.signAsync(payload),
  //   };
  // }
}
