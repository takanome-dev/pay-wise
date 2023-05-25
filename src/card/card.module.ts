import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardController } from './card.controller';
import { Card } from './card.entity';
import { CardService } from './card.service';
import { UserModule } from '../user/user.module';
import { JwtConfigModule } from '../jwt/jwt.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Card]),
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
  controllers: [CardController],
  providers: [
    CardService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
})
export class CardModule {}
