import {
  Injectable,
  type CanActivate,
  type ExecutionContext,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ROLES_KEY, type Role } from '../utils/constants';

/**
 *
 */
@Injectable()
export class RolesGuard implements CanActivate {
  /**
   *
   * @param reflector
   */
  constructor(private reflector: Reflector) {}

  /**
   *
   * @param context
   */
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest<Request>();

    return requiredRoles.some((role) => user.role === role);
  }
}
