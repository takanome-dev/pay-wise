import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../auth.service';

/**
 *
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  /**
   *
   * @param authService
   */
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  /**
   *
   * @param email
   * @param password
   */
  async validate(email: string, password: string) {
    const user = await this.authService.validateUser({ email, password });
    if (!user) throw new BadRequestException('Invalid email or password');
    return user;
  }
}
