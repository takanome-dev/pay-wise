import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import type { JwtUserDto } from '../../user/user.dto';

export const User = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return request.user;
  },
);

function isLocalStrategy(user?: any): user is JwtUserDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return user?.sub !== undefined;
}

export const UserId = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    if (isLocalStrategy(request.user)) return request.user.sub;
    return parseInt(request.user?.user_metadata.sub as string, 10);
  },
);
