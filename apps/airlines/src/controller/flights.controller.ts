import { Body, Controller, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { FlightService } from "../service/flights.service";
import { FlightDto } from "../dto/get-flight.dto";
import { AddFlightRequest } from "../dto/add-flight-request.dto";
import { UpdateFlightData } from "../dto/update-flight.data";
import { SuccessResponse } from "../dto/success-response.dto";

@Controller('flights') 
export class FlightController {
    constructor(
        private readonly flightService: FlightService
    ) {}

    @Get(':id')
    async findFlightsById(@Param('id') id: number): Promise<FlightDto> {
        return this.flightService.getFlightById(id);
    }

    @Get()
    async findFlightsByRoute(@Query('origin') origin: string, @Query('destination') destination: string): Promise<FlightDto[]> {
        return this.flightService.getFlightByLocation(origin, destination);
    }

    @Post(':id/add')
    async addFlight(@Param('id') id: number, @Body() addData: AddFlightRequest): Promise<FlightDto> {
        return this.flightService.addFlight(id, addData);
    }

    @Patch(':id/update')
    async updateFlight(@Param('id') id: number, @Body() updateData: UpdateFlightData): Promise<SuccessResponse> {
        return this.flightService.updateFlight(id, updateData);
    }
}