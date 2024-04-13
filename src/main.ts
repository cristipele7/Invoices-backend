import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from 'http';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const server: Server = await app.listen(3000);
  server.keepAliveTimeout = 120 * 1000;
  server.headersTimeout = 125 * 1000;
}
bootstrap();
