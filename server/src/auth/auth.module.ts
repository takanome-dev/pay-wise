import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { JwtConfigModule } from '../jwt/jwt.module';
import { UserModule } from '../user/user.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SupabaseStrategy } from './strategies/supabase.strategy';

@Module({
  imports: [UserModule, JwtConfigModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, SupabaseStrategy],
})
export class AuthModule {}
