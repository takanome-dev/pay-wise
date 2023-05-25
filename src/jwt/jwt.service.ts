import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWT_KEYS } from '../common/utils/constants';
import { ConfigService } from '@nestjs/config';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

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

  async encrypt(str: string) {
    const iv = randomBytes(16);

    const key = (await promisify(scrypt)(
      this.configService.get(JWT_KEYS.JWT_CYPHER_KEY),
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
      this.configService.get(JWT_KEYS.JWT_CYPHER_KEY),
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
