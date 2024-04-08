import { Module } from '@nestjs/common';
import { FlightBookingController } from './controller/flight-booking.controller';
import { FlightBookingService } from './service/flight-booking.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from './schemas/booking.schama';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/flight_bookings'),
    MongooseModule.forFeature([{name: Booking.name, schema: BookingSchema}])
  ],
  controllers: [FlightBookingController],
  providers: [FlightBookingService],
})
export class FlightBookingModule {}
