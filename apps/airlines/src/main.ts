import { NestFactory } from '@nestjs/core';
import { AirlinesModule } from './airlines.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AirlinesModule);
  // const configService = app.get(ConfigService);
  // const port = configService.get('PORT');
  // console.log('PORT:', port)
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3001);
}
bootstrap();
