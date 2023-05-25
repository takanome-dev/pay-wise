import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from '../common/decorators/skip-auth.decorator';
import { JwtConfigService } from '../jwt/jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtConfigService: JwtConfigService,
    private reflector: Reflector,
  ) {}

  async canActivate(ctx: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
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
      const payload = await this.jwtConfigService.verifyAsync(
        token,
        'JWT_PASSWD_SECRET',
      );

      req['user'] = payload;
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
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
