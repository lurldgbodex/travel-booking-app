import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Flight } from '../interfaces/flight.interface';
import mongoose, { Model } from 'mongoose';
import { BookFlightRequest } from '../dto/BookFlightRequest';
import { randomUUID } from 'crypto';
import { Booking } from '../schemas/booking.schama';

@Injectable()
export class FlightBookingService {
  constructor(
    @InjectModel(Booking.name) private flightModel: Model<Booking>
    ) {}
  
  async findAllBookedFlight(): Promise<Flight[]> {
     const flightBookings: Booking [] = await this.flightModel.find();
     const flights: Flight[] = flightBookings.map(booking => ({
      flight_id: booking.flightId,
      user_id: booking.userId,
      status: booking.status,
      created_at: booking.createdAt,
     }));

     return flights;
  }

  async findById(id: string): Promise<Flight> {
    const isIdValid = mongoose.Types.ObjectId.isValid(id);
    
    if (!isIdValid) {
      throw new NotFoundException(`Booked flight not found with id ${id}`);
    }
    const flightBooking: Booking | null = await this.flightModel.findById(id);

    if (!flightBooking) {
      throw new NotFoundException('flight not found');
    }

    const flight: Flight = {
      flight_id: flightBooking.flightId,
      user_id: flightBooking.userId,
      status: flightBooking.status,
      created_at: flightBooking.createdAt
    };

    return flight;
  }

  async bookFlight(bookFlightRequest: BookFlightRequest) {

    //todo: make a call to airlines to check airlines available for destination;
    const flightDetails = await this.httpService

    const newBookFlightRequest = new this.flightModel({
      flightNumber: randomUUID,
      origin: bookFlightRequest.origin,
      name: bookFlightRequest.name,
      destination: bookFlightRequest.destination,
      departureDay: bookFlightRequest.departureDay,
      departureTime: bookFlightRequest.departureDay,
      arrivalTime: bookFlightRequest.departureDay
    });

    return newBookFlightRequest.save();
  }

}
