import type { ApiConfigType } from './api.config';
import type { DbConfigType } from './db.config';
import type { JwtConfigType } from './jwt.config';
import type { SupabaseConfigType } from './supabase.config';

export * from './api.config';
export * from './db.config';
export * from './supabase.config';
export * from './jwt.config';

export type GlobalConfigType = {
  api: ApiConfigType;
  db: DbConfigType;
  supabase: SupabaseConfigType;
  jwt: JwtConfigType;
};
