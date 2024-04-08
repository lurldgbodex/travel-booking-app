import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { Route } from "../entity/route.entity";
import { EntityManager, Repository } from "typeorm";
import { AddRouteDto } from "../dto/add-route.dto";
import { Airline } from "../entity/airline.entity";
import { UpdateRouteData } from "../dto/update-route.dto";
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

    async addRouteToAirline(airlineId: number, addRouteDto: AddRouteDto): Promise<Route> {
        const airline = await this.airlineRepository.findOneBy({id: airlineId});
        
        if (!airline) {
            throw new NotFoundException(`Airline with ID ${airlineId} not found`);
        }

        return this.entityManager.transaction(async (manager: EntityManager) => {
            const route = await this.routeRepository.create({
                origin: addRouteDto.origin,
                destination: addRouteDto.destination,
                price: addRouteDto.price,
                departureTime: addRouteDto.departure_time,
                arrivalTime: addRouteDto.arrival_time,
                airline: airline,
                type: addRouteDto.type,
            });
            return manager.save(route);
        });
    }

    async getRoute() {}

    async updateRoute(routeId: number, updateRouteData: UpdateRouteData): Promise<Route> {
        const existingRoute = await this.routeRepository.findOneBy({id: routeId});
        
        if (!existingRoute) {
            throw new NotFoundException(`Route with id ${routeId} not found`);
        }

        return this.entityManager.transaction(async (manager: EntityManager) => {
            manager.merge(Route, existingRoute, updateRouteData);
            return manager.save(existingRoute);
        });
    }

    async deleteRoute() {}
}