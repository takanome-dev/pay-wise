import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JWT_KEYS } from '../common/utils/constants';

// import type { JwtUserDto } from '../user/user.dto';

@Injectable()
export class JwtConfigService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signAsync(payload: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get(JWT_KEYS.JWT_PASSWD_SECRET),
    });
  }
  // async signAsync(payload: Omit<JwtUserDto, 'exp' | 'iat'>) {
  //   return this.jwtService.signAsync(payload, {
  //     secret: this.configService.get(JWT_KEYS.JWT_PASSWD_SECRET),
  //   });
  // }

  async verifyAsync(token: string) {
    return this.jwtService.verifyAsync(token, {
      secret: this.configService.get(JWT_KEYS.JWT_PASSWD_SECRET),
    });
  }

  async bcryptHash(str: string) {
    return bcrypt.hash(str, 10);
  }

  async bcryptCompare(str: string, hash: string) {
    return bcrypt.compare(str, hash);
  }

  async encrypt(str: string) {
    const iv = randomBytes(16);

    const key = (await promisify(scrypt)(
      this.configService.get(JWT_KEYS.JWT_CYPHER_KEY)!,
      'salt',
      32,
    )) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, iv);

    const encryptedText = Buffer.concat([cipher.update(str), cipher.final()]);

    return `${iv.toString('hex')}:${encryptedText.toString('hex')}`;
  }

  async decrypt(str: string) {
    const [iv, encryptedText] = str.split(':');
    const key = (await promisify(scrypt)(
      this.configService.get(JWT_KEYS.JWT_CYPHER_KEY)!,
      'salt',
      32,
    )) as Buffer;
    const decipher = createDecipheriv(
      'aes-256-ctr',
      key,
      Buffer.from(iv, 'hex'),
    );
    const decryptedText = Buffer.concat([
      decipher.update(Buffer.from(encryptedText, 'hex')),
      decipher.final(),
    ]);

    return decryptedText.toString();
  }
}
