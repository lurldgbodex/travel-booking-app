import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AirlinesService } from '../service/airlines.service';
import { Airline } from '../entity/airline.entity';
import { CreateAirlineDto } from '../dto/create-airline.dto';
import { AddRouteDto } from '../dto/add-route.dto';
import { Route } from '../entity/route.entity';
import { RouteService } from '../service/routes.service';
import { UpdateRouteData } from '../dto/update-route.dto';
import { AirlineDto } from '../dto/get-airline.dto';

@Controller('airlines')
export class AirlinesController {
  constructor(
    private readonly airlinesService: AirlinesService,
    private readonly routeService: RouteService
    ) {}

  @Get()
  async findAll( includeRoutes: boolean): Promise<AirlineDto[]> {
    return this.airlinesService.findAllAirlines();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<AirlineDto> {
    return this.airlinesService.findAirlineById(id);
  }

  @Post('add')
  async create(@Body() airlineData: CreateAirlineDto): Promise<Airline> {
    return this.airlinesService.createAirline(airlineData);
  }

  @Post(':airlineId/routes')
  async addRouteToAirline(@Param('airlineId') airlineId: number, @Body() routeData: AddRouteDto): Promise<Route> {
    return this.routeService.addRouteToAirline(airlineId, routeData);
  }

  @Put('routes/:routeId')
  async updateRoute(@Param('routeId') routeId: number, @Body() routeData: UpdateRouteData): Promise<Route> {
    return this.routeService.updateRoute(routeId, routeData);
  }
}
