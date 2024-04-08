import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { Route } from "../entity/route.entity";
import { EntityManager, Repository } from "typeorm";
import { AddRouteDto } from "../dto/add-route.dto";
import { Airline } from "../entity/airline.entity";
import { UpdateRouteData } from "../dto/update-route.dto";
import { RouteDto } from "../dto/get-route.dto";
import { SuccessResponse } from "../dto/success-response.dto";
import { RouteType } from "../entity/route-type.enum";

@Injectable()
export class RouteService {
    constructor(
        @InjectRepository(Route)
        private readonly routeRepository: Repository<Route>,
        @InjectRepository(Airline)
        private readonly airlineRepository: Repository<Airline>,
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {}

    async addRouteToAirline(airlineId: number, addRouteDto: AddRouteDto): Promise<RouteDto> {
        const airline = await this.airlineRepository.findOneBy({id: airlineId});
        
        if (!airline) {
            throw new NotFoundException(`Airline with ID ${airlineId} not found`);
        }

        return this.entityManager.transaction(async (manager: EntityManager) => {
            const route = await this.routeRepository.create({
                origin: addRouteDto.origin,
                destination: addRouteDto.destination,
                airline: airline,
                type: addRouteDto.type,
            });

            await manager.save(route);

            const routeDto = new RouteDto();
            routeDto.id = route.id;
            routeDto.origin = route.origin;
            routeDto.destination = route.destination;
            routeDto.type = route.type;
            routeDto.airline_id = route.airline.id;

            return routeDto;
        });
    }

    async getRouteById(routeId: number): Promise<RouteDto> {
        const route = await this.routeRepository.findOneBy({id: routeId});

        if (!route) {
            throw new NotFoundException(`Rotue with id ${routeId} not found`);
        }

        const routeDto = {
            'id': route.id,
            'origin': route.origin,
            'destination': route.destination,
            'type': route.type,
            'airline_id': route.airline.id
        };

        return routeDto;
    }

    async getRouteByType(routeType: RouteType): Promise<RouteDto[]> {
        const route = await this.routeRepository.find({
            where: {type: routeType}
        });

       const routeDto: RouteDto[] = route.map(route => ({
        id: route.id,
        origin: route.origin,
        destination: route.destination,
        type: route.type,
        airline_id: route.airline.id,
       }));

       return routeDto;
    }



    async updateRoute(routeId: number, updateRouteData: UpdateRouteData): Promise<RouteDto> {
        const existingRoute = await this.routeRepository.findOneBy({id: routeId});
        
        if (!existingRoute) {
            throw new NotFoundException(`Route with id ${routeId} not found`);
        }

        return this.entityManager.transaction(async (manager: EntityManager) => {
            await manager.merge(Route, existingRoute, updateRouteData);
            await manager.save(existingRoute);

            const route = {
                'id': existingRoute.id,
                'origin': existingRoute.origin,
                'destination': existingRoute.destination,
                'type': existingRoute.type,
                'airline_id': existingRoute.airline.id,
            }
            return route;
        });
    }

    async deleteRoute(routeId: number) {
        const route = await this.routeRepository.findOneBy({id: routeId});

        if (!route) {
            throw new NotFoundException("Route not found with id");
        }

        await this.routeRepository.delete(route);

        return new SuccessResponse("Route deleted Successfully");
    }
}