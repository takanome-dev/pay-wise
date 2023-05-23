import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginUserDto, RegisterUserDto } from '../auth/auth.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { comparePassword, hashPassword } from '../common/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(userInfos: LoginUserDto) {
    const user = await this.userService.findByEmail(userInfos.email);

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordValid = await comparePassword(
      userInfos.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(userInfos: RegisterUserDto) {
    const hashedPassword = await hashPassword(userInfos.password);

    const newUser = await this.userService.create({
      ...userInfos,
      password: hashedPassword,
    });

    const payload = { sub: newUser.id, email: newUser.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
