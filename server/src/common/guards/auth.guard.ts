import { AuthGuard } from '@nestjs/passport';

export class ExtendedAuthGuard extends AuthGuard(['jwt', 'supabase']) {}
