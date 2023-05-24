import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWT_KEYS } from '../common/utils/constants';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtConfigService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signAsync(
    payload: { sub: number; email: string },
    key: keyof typeof JWT_KEYS,
  ) {
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get(JWT_KEYS[key]),
    });
  }

  async verifyAsync(token: string, key: keyof typeof JWT_KEYS) {
    return await this.jwtService.verifyAsync(token, {
      secret: this.configService.get(JWT_KEYS[key]),
    });
  }

  async bcryptHash(str: string) {
    return await bcrypt.hash(str, 10);
  }

  async bcryptCompare(str: string, hash: string) {
    return await bcrypt.compare(str, hash);
  }
}
