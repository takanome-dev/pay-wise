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
import type { GlobalConfigType } from './config';
import { DbConfig, ApiConfig, SupabaseConfig, JwtConfig } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [DbConfig, ApiConfig, SupabaseConfig, JwtConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService<GlobalConfigType>) => ({
        type: 'postgres',
        host: config.get('db', { infer: true }).host,
        port: config.get('db', { infer: true }).port,
        username: config.get('db', { infer: true }).username,
        password: config.get('db', { infer: true }).password,
        database: config.get('db', { infer: true }).database,
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
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(AuthMiddleware).forRoutes('v1/auth/login');
//   }
// }
