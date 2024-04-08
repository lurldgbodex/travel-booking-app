import { Module } from '@nestjs/common';
import { FlightBookingController } from './flight-booking.controller';
import { FlightBookingService } from './flight-booking.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FlightBooking, FlightBookingSchema } from '../schemas/flightBookings.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/flight_bookings'),
    MongooseModule.forFeature([{name: FlightBooking.name, schema: FlightBookingSchema}])
  ],
  controllers: [FlightBookingController],
  providers: [FlightBookingService],
})
export class FlightBookingModule {}
