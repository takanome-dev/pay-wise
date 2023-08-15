import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import type { GlobalConfigType } from '../../config';
import type { JwtUserDto } from '../../user/user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  constructor(private readonly config: ConfigService<GlobalConfigType>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('jwt', { infer: true }).jwt_passwd_key,
    });
  }

  async validate(payload: JwtUserDto) {
    return { id: payload.sub, email: payload.email };
  }
}
