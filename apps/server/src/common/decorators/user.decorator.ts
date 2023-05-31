import { createParamDecorator, type ExecutionContext } from '@nestjs/common';

import type { JwtUserDto } from '../../user/user.dto';
import type { Request } from 'express';

export const User = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return request.user as JwtUserDto;
  },
);

export const UserId = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return String((request.user as JwtUserDto).sub);
  },
);
