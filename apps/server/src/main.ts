import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { major } from 'semver';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

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
  SwaggerModule.setup('/', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: String(major('1.0.0', { loose: false })),
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );
  app.useLogger(app.get(Logger));
  await app.listen(3000);
}
bootstrap();
