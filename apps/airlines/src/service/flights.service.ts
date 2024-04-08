import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Flight } from "../entity/flight.entity";
import { Repository } from "typeorm";
import { FlightDto } from "../dto/get-flight.dto";
import { AddFlightRequest } from "../dto/add-flight-request.dto";
import { Airline } from "../entity/airline.entity";
import { FlightStatus } from "../interfaces/flight-status.enum";
import { SuccessResponse } from "../dto/success-response.dto";
import { UpdateFlightData } from "../dto/update-flight.data";

@Injectable()
export class FlightService {
    constructor(
        @InjectRepository(Flight)
        private readonly flightRepository: Repository<Flight>,
        @InjectRepository(Airline)
        private readonly airlineRepository: Repository<Airline>
    ) {}

    async getFlightById(flightId: number): Promise<FlightDto> {
        const flight = await this.flightRepository.findOneBy({id: flightId});

        if (!flight) {
            throw new NotFoundException('flight not found with id');
        }

        const flightDto = {
            id: flight.id,
            arrival_time: flight.arrivalTime,
            departure_time: flight.departureTime,
            status: flight.status,
            airline: flight.airline.name,
            package: flight.package,
            origin: flight.origin,
            destination: flight.destination
        }

        return flightDto;
    }

    async getFlightByLocation(origin: string, destination: string): Promise<FlightDto[]> {
        const flights = await this.flightRepository.find({
            where: { 
                origin: origin, 
                destination: destination,
            },
        });

        return flights.map(flight => ({
            id: flight.id,
            airline: flight.airline.name,
            origin: flight.airline.routes.find(route => route.origin == origin)?.origin,
            destination: flight.airline.routes.find(route => route.destination == destination)?.destination,
            departure_time: flight.departureTime,
            arrival_time: flight.arrivalTime,
            status: flight.status,
            package: flight.package, 
        }));
    }

    async addFlight(airlineId: number, addFlightRequest: AddFlightRequest): Promise<FlightDto> {
        const airline = await this.airlineRepository.findOneBy({ id: airlineId });

        if (!airline) {
            throw new NotFoundException(`Airline with id not found`);
        }

        const { price, class_type , ...flightData } = addFlightRequest; 

        const flight = new Flight();
        flight.airline = airline;
        flight.status = FlightStatus.available;

        const flightPackage = {
            price: price,
            class: class_type
        };

        flight.package = flightPackage;

        Object.assign(flight, flightData);

        await this.flightRepository.save(flight);

        const flightDto = {
            id: flight.id,
            origin: flight.origin,
            destination: flight.destination,
            departure_time: flight.departureTime,
            arrival_time: flight.arrivalTime,
            status: flight.status,
            package: flight.package,
            airline: airline.name
        }

        return flightDto;
    }

    async updateFlight(flightId: number, updateData: UpdateFlightData): Promise<SuccessResponse> {
        const flight = await this.flightRepository.findOneBy({ id: flightId });

        if (!flight) {
            throw new NotFoundException('Flight not found with id');
        }

        const { status, departure_time, arrival_time, price, passenger_class } = updateData;

        if (status) {
            flight.status = status;
        }

        if (arrival_time) {
            flight.arrivalTime = arrival_time;
        }

        if (departure_time && arrival_time) {
            flight.departureTime = departure_time;
            flight.arrivalTime = arrival_time
        }

        if (price && passenger_class) {
            flight.package.price = price;
            flight.package.class = passenger_class;
        } else if (price && !passenger_class) {
            throw new BadRequestException("please specify which passenger class price to update")
        }

        return new SuccessResponse("Flight updated successfully");
    }

}