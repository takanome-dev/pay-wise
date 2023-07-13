import { Module } from '@nestjs/common';
import { clc } from '@nestjs/common/utils/cli-colors.util';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import path from 'path';

import { AuthModule } from './auth/auth.module';
import { CardModule } from './card/card.module';
import { CustomerModule } from './customer/customer.module';
import { JwtConfigModule } from './jwt/jwt.module';
import { UserModule } from './user/user.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [path.join(`${__dirname}/**/*.entity.ts`)],
        autoLoadEntities: true,
        // TODO: remove synchronize in production
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            levelFirst: true,
            translateTime: 'UTC:hh:MM:ss.l',
            singleLine: true,
            messageFormat: `${clc.yellow('[{context}]')} ${clc.green('{msg}')}`,
            ignore: 'pid,hostname,context',
          },
        },
        customProps: () => ({ context: 'HTTP' }),
      },
    }),
    UserModule,
    CardModule,
    AuthModule,
    JwtConfigModule,
    CustomerModule,
    TransactionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
