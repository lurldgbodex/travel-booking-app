import { NestFactory } from '@nestjs/core';
import { FlightBookingModule } from './flight-booking.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(FlightBookingModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
