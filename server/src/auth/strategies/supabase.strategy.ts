import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  SupabaseAuthStrategy,
  type SupabaseAuthUser,
} from 'nestjs-supabase-auth';
import { ExtractJwt } from 'passport-jwt';

import type { Request } from 'express';

@Injectable()
export class SupabaseStrategy extends PassportStrategy(
  SupabaseAuthStrategy,
  'supabase',
) {
  constructor() {
    super({
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_ANON_KEY,
      supabaseOptions: {},
      supabaseJwtSecret: process.env.SUPABASE_JWT_KEY,
      extractor: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: SupabaseAuthUser): Promise<any> {
    return payload;
    // super.validate(payload);
  }

  authenticate(req: Request) {
    super.authenticate(req);
  }
}
