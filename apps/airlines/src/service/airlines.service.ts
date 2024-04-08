import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Airline } from '../entity/airline.entity';
import { Repository } from 'typeorm';
import { Route } from '../entity/route.entity';
import { CreateAirlineDto } from '../dto/create-airline.dto';
import { AirlineDto } from '../dto/get-airline.dto';
import { RouteDto } from '../dto/get-route.dto';

@Injectable()
export class AirlinesService {
  constructor( 
    @InjectRepository(Airline)
    private readonly airlineRepository: Repository<Airline>,
    ) {}

  async findAllAirlines(): Promise<AirlineDto[]> {
    const airlines = await this.airlineRepository.find({relations: ['routes']});
    return airlines.map(airline => this.mapAirlineToDto(airline));
  }
  private mapAirlineToDto(airline: Airline): AirlineDto {
    const { id, name, description } = airline
    const logo_url = airline.logoUrl;
    const contact_email = airline.contactEmail;

    const routesDto: RouteDto[] = airline.routes.map(route => ({
      id: route.id,
      origin: route.origin,
      destination: route.destination,
      price: route.price,
      departure_time: route.departureTime,
      arrival_time: route.arrivalTime,
    }));

    return {
      id, 
      name, 
      description, 
      logo_url, 
      contact_email, 
      routes: routesDto,
    }
  }

  async findAirlineById(id: number): Promise<AirlineDto> {

    const airline = await this.airlineRepository.findOne({
      where: {id},
      relations: ['routes'],
    });
    
    if (!airline) {
      throw new NotFoundException(`airline not found with id ${id}`);
    }
    
    const airlineDto = new AirlineDto();
    airlineDto.id = airline.id;
    airlineDto.logo_url = airline.logoUrl;
    airlineDto.name = airline.name;
    airlineDto.description = airline.description;
    airlineDto.contact_email = airline.contactEmail;
    airlineDto.routes = airline.routes.map(route => ({
      'id': route.id,
      'origin': route.origin,
      'price': route.price,
      'destination': route.destination,
      'departure_time': route.departureTime,
      'arrival_time': route.arrivalTime
    }));

    return airlineDto;
  }

  async createAirline(airlineData: CreateAirlineDto): Promise<Airline> {
    const airline = this.airlineRepository.create(airlineData);
    return this.airlineRepository.save(airline);
  }
}
