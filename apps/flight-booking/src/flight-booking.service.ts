import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Flight } from '../interfaces/Flight.interface';
import mongoose, { Model } from 'mongoose';
import { FlightBooking } from '../schemas/flightBookings.schema';
import { BookFlightRequest } from '../dto/BookFlightRequest';
import { randomUUID } from 'crypto';

@Injectable()
export class FlightBookingService {
  constructor(@InjectModel(FlightBooking.name) private flightModel: Model<FlightBooking>) {}
  
  async findAll(): Promise<Flight[]> {
     const flightBookings: FlightBooking [] = await this.flightModel.find();
     const flights: Flight[] = flightBookings.map(booking => ({
      flightNumber: booking.flightNumber,
      origin: booking.origin,
      destination: booking.destination,
      departureTime: booking.departureTime,
      arrivalTime: booking.arrivalTime
     }));

     return flights;
  }

  async findById(id: string): Promise<Flight> {
    const isIdValid = mongoose.Types.ObjectId.isValid(id);
    
    if (!isIdValid) {
      throw new HttpException('flight not found', HttpStatus.NOT_FOUND);
    }
    const flightBooking: FlightBooking | null = await this.flightModel.findById(id);

    if (!flightBooking) {
      throw new HttpException('flight not found', HttpStatus.NOT_FOUND);
    }

    const flight: Flight = {
      flightNumber: flightBooking.flightNumber,
      origin: flightBooking.origin,
      destination: flightBooking.destination,
      departureTime: flightBooking.departureTime,
      arrivalTime: flightBooking.arrivalTime
    };

    return flight;
  }

  async bookFlight(bookFlightRequest: BookFlightRequest) {

    //todo: make a call to airlines to check airlines available for destination;

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
