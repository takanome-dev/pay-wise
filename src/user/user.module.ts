import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtConfigModule } from '../jwt/jwt.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtConfigModule,
    // JwtModule.registerAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     global: true,
    //     secret: configService.get('JWT_SECRET'),
    //     signOptions: { expiresIn: '7d' },
    //   }),
    //   inject: [ConfigService],
    // }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
