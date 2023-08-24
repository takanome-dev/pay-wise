import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import type { GlobalConfigType } from '../../config';
import type { JwtUserDto } from '../../user/user.dto';

/**
 *
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  /**
   *
   * @param config
   */
  constructor(private readonly config: ConfigService<GlobalConfigType>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('jwt', { infer: true }).jwt_passwd_key,
    });
  }

  /**
   *
   * @param payload
   */
  async validate(payload: JwtUserDto) {
    return { id: payload.sub, email: payload.email };
  }
}
