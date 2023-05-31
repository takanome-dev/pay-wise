import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  type CanActivate,
  type ExecutionContext,
} from '@nestjs/common';

import { IS_PUBLIC_KEY } from '../common/decorators/skip-auth.decorator';

import type { JwtConfigService } from '../jwt/jwt.service';
import type { JwtUserDto } from '../user/user.dto';
import type { Reflector } from '@nestjs/core';
import type { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtConfigService: JwtConfigService,
    private reflector: Reflector,
  ) {}

  async canActivate(ctx: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);

    if (isPublic) return true;

    const req = ctx.switchToHttp().getRequest<Request>();
    const token = this.extractJwtFromHeader(req);

    if (!token) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    try {
      const payload = (await this.jwtConfigService.verifyAsync(
        token,
      )) as JwtUserDto;

      req.user = payload;
      return true;
    } catch (err) {
      throw new BadRequestException('Invalid token');
    }
  }

  private extractJwtFromHeader(req: Request) {
    if (!req.headers.authorization) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const [type, token] = req.headers.authorization.split(' ') ?? [];

    return type === 'Bearer' ? token : null;
  }
}
