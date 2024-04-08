import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FlightBookingService } from '../service/flight-booking.service';
import { Flight } from '../interfaces/flight.interface';
import { BookFlightRequest } from '../dto/BookFlightRequest';

@Controller('flights')
export class FlightBookingController {
  constructor(private flightBookingService: FlightBookingService) {}

  @Post('book')
  async bookFlight(@Body() request: BookFlightRequest) {
    return this.flightBookingService.bookFlight(request);
  }

  @Get()
  async findAll(): Promise<Flight[]> {
    return this.flightBookingService.findAll();
  }

  @Get(':id')
  async findById(@Param() id: string): Promise<Flight> {
    return this.flightBookingService.findById(id);
  }

}
