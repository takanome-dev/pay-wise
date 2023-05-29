import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginUserDto, RegisterUserDto } from '../auth/auth.dto';
import { UserService } from '../user/user.service';
import { JwtConfigService } from '../jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtConfigService: JwtConfigService,
  ) {}

  async signIn(userInfos: LoginUserDto) {
    const user = await this.userService.findByEmail(userInfos.email);

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordValid = await this.jwtConfigService.bcryptCompare(
      userInfos.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };

    return {
      access_token: await this.jwtConfigService.signAsync(payload),
    };
  }

  async signUp(userInfos: RegisterUserDto) {
    const hashedPassword = await this.jwtConfigService.bcryptHash(
      userInfos.password,
    );

    const newUser = await this.userService.create({
      ...userInfos,
      password: hashedPassword,
    });

    const payload = {
      sub: newUser.id,
      email: newUser.email,
      role: newUser.role,
    };

    return {
      access_token: await this.jwtConfigService.signAsync(payload),
    };
  }
}
