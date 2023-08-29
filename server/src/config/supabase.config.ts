import { registerAs } from '@nestjs/config';

export type SupabaseConfigType = ReturnType<typeof SupabaseConfig>;

export const SupabaseConfig = registerAs('supabase', () => ({
  supabase_url: String(process.env.SUPABASE_URL),
  supabase_key: String(process.env.SUPABASE_ANON_KEY),
  supabase_jwt: String(process.env.SUPABASE_JWT_KEY),
}));

export default SupabaseConfig;
