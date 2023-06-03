import {
  Injectable,
  type CanActivate,
  type ExecutionContext,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';
import type { Request } from 'express';
import { ROLES_KEY, type Role } from '../utils/roles';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) return true;

    const user = context.switchToHttp().getRequest<Request>().user!;

    return requiredRoles.some((role) => user.role === role);
  }
}
