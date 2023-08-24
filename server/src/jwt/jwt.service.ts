import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import type { GlobalConfigType } from '../config';
import type { JwtUserDto } from '../user/user.dto';

/**
 *
 */
@Injectable()
export class JwtConfigService {
  /**
   *
   * @param jwtService
   * @param config
   */
  constructor(
    private jwtService: JwtService,
    private config: ConfigService<GlobalConfigType>,
  ) {}

  /**
   *
   * @param payload
   */
  async signAsync(payload: Omit<JwtUserDto, 'exp' | 'iat'>) {
    return this.jwtService.signAsync(payload, {
      secret: this.config.get('jwt', { infer: true }).jwt_passwd_key,
    });
  }

  /**
   *
   * @param token
   */
  async verifyAsync(token: string) {
    return this.jwtService.verifyAsync(token, {
      secret: this.config.get('jwt', { infer: true }).jwt_passwd_key,
    });
  }

  /**
   *
   * @param str
   */

  /**
   *
   * @param str
   */
  // eslint-disable-next-line class-methods-use-this
  bcryptHash(str: string) {
    return bcrypt.hash(str, 10);
  }

  /**
   *
   * @param str
   * @param hash
   */
  // eslint-disable-next-line class-methods-use-this
  bcryptCompare(str: string, hash: string) {
    return bcrypt.compare(str, hash);
  }

  /**
   *
   * @param str
   */
  async encrypt(str: string) {
    const iv = randomBytes(16);
    const key = (await promisify(scrypt)(
      this.config.get('jwt', { infer: true }).jwt_cypher_key,
      'salt',
      32,
    )) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, iv);
    const encryptedText = Buffer.concat([cipher.update(str), cipher.final()]);
    return `${iv.toString('hex')}:${encryptedText.toString('hex')}`;
  }

  /**
   *
   * @param str
   */
  async decrypt(str: string) {
    const [iv, encryptedText] = str.split(':');
    const key = (await promisify(scrypt)(
      this.config.get('jwt', { infer: true }).jwt_cypher_key,
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
