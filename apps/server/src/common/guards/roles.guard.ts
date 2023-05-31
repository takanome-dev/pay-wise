/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Injectable,
  type CanActivate,
  type ExecutionContext,
} from '@nestjs/common';

import { ROLES_KEY, type Role } from '../utils/roles';

import type { JwtUserDto } from '../../user/user.dto';
import type { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) return true;

    const user = context.switchToHttp().getRequest()?.user as JwtUserDto;

    return requiredRoles.some((role) => user.role === role);
  }
}
