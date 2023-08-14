import path from 'node:path';
import { writeFile } from 'node:fs/promises';

import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { major } from 'semver';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import type { GlobalConfigType } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    rawBody: true,
  });

  const configService = app.get<ConfigService<GlobalConfigType>>(ConfigService);
  const { port, host, domain } = configService.get('api', { infer: true });
  const options = new DocumentBuilder();

  options
    .addServer(`http://${domain}/v1`, 'Development')
    .setTitle('Pay Wise API')
    .setVersion('1.0')
    .addBearerAuth();
  const document = SwaggerModule.createDocument(app, options.build(), {
    operationIdFactory: (_, methodKey: string) => methodKey,
  });

  const outputPath = path.resolve(process.cwd(), 'dist/swagger.json');

  try {
    await writeFile(outputPath, JSON.stringify(document, null, 2), {
      encoding: 'utf8',
    });
  } catch (e) {
    console.log(e);
  }

  SwaggerModule.setup('/', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: String(major('1.0.0', { loose: false })),
  });
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );

  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  await app.listen(port, host);
}

bootstrap();
