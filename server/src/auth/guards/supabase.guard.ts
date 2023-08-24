import { Injectable, type ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { IS_PUBLIC_KEY } from '../../common/decorators/public';

/**
 *
 */
@Injectable()
export class SupabaseGuard extends AuthGuard('supabase') {
  /**
   *
   * @param reflector
   */
  constructor(private reflector: Reflector) {
    super();
  }

  /**
   *
   * @param context
   */
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;
    return super.canActivate(context) as Promise<boolean>;
  }
}
