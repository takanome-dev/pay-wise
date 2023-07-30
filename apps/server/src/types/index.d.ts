import type { SupabaseAuthUser } from 'nestjs-supabase-auth';
import type { JwtUserDto } from '../user/user.dto';

declare global {
  declare interface Request {
    user?: JwtUserDto | SupabaseAuthUser;
  }
}
