import { Expose, Transform } from "class-transformer";
import { RouteDto } from "./get-route.dto";

export class AirlineDto {
    id: number;
    name: string;

    logo_url: string;

    description: string;

    contact_email: string;

    routes: RouteDto[];
}