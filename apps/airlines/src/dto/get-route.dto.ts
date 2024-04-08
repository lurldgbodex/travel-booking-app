import { RouteType } from "../entity/route-type.enum";

export class RouteDto {
    id: number;
    airline_id?: number;
    type: RouteType;
    origin: string;
    destination: string;
}