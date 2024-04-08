import { FlightStatus } from "../interfaces/flight-status.enum";
import { FlightPackage } from "../interfaces/package.interface";

export class FlightDto {
    id: number
    airline: string;
    origin: string;
    destination: string;
    departure_time: Date;
    arrival_time: Date;
    status: FlightStatus;
    package: FlightPackage;
}