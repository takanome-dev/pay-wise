import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  SupabaseAuthStrategy,
  type SupabaseAuthUser,
} from 'nestjs-supabase-auth';
import { ExtractJwt } from 'passport-jwt';

import type { Request } from 'express';
// import { ConfigService } from '@nestjs/config';
// import { GlobalConfigType } from '../../config';

/**
 *
 */
@Injectable()
export class SupabaseStrategy extends PassportStrategy(
  SupabaseAuthStrategy,
  'supabase',
) {
  /**
   *
   */
  constructor() {
    super({
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_ANON_KEY,
      supabaseOptions: {},
      supabaseJwtSecret: process.env.SUPABASE_JWT_KEY,
      extractor: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  /**
   *
   * @param payload
   */
  async validate(payload: SupabaseAuthUser): Promise<any> {
    return payload;
    // super.validate(payload);
  }

  /**
   *
   * @param req
   */
  authenticate(req: Request) {
    super.authenticate(req);
  }
}
