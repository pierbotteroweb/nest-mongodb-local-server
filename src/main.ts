import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

// const defaultCorsOrigins = [
//   'http://localhost',
//   'http://localhost:4200',
//   'http://localhost:4444',
//   'http://localhost:1991',
//   'http://127.0.0.1',
//   'http://127.0.0.1:4200',
//   'http://127.0.0.1:4444',
//   'http://thisisshuffletv',
//   'http://thisisshuffletv.local',
//   'http://thisisshuffletv:4444',
//   'http://thisisshuffletv.local:4444',
// ];

// const allowedCorsOrigins = new Set(
//   (process.env.CORS_ORIGINS ?? defaultCorsOrigins.join(','))
//     .split(',')
//     .map((origin) => origin.trim())
//     .filter(Boolean),
// );

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.enableCors({
  //   origin: (origin, callback) => {
  //     if (!origin || allowedCorsOrigins.has(origin)) {
  //       callback(null, true);
  //       return;
  //     }

  //     callback(null, false);
  //   },
  //   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  //   allowedHeaders: ['Content-Type', 'Authorization'],
  // });


  const logger = new Logger('Bootstrap');

  logger.log('🚀 Servidor rodando em http://localhost:3000');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
