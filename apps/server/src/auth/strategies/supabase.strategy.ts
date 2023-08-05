import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import {
  SupabaseAuthStrategy,
  type SupabaseAuthUser,
} from 'nestjs-supabase-auth';

@Injectable()
export class SupabaseStrategy extends PassportStrategy(
  SupabaseAuthStrategy,
  'supabase',
) {
  public constructor() {
    super({
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_ANON_KEY,
      supabaseOptions: {},
      supabaseJwtSecret: process.env.SUPABASE_JWT_KEY,
      extractor: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: SupabaseAuthUser): Promise<any> {
    // console.log({ payload });
    super.validate(payload);
  }

  authenticate(req: never) {
    console.log({ request: req });
    super.authenticate(req);
  }
}
