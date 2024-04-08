import { IsDateString, IsEnum } from "class-validator";
import { FlightStatus } from "../interfaces/flight-status.enum";
import { CustomerClass } from "../interfaces/customer-type.enum";

export class UpdateFlightData {
    @IsEnum(FlightStatus)
    status: FlightStatus;

    @IsDateString()
    departure_time: Date;

    @IsDateString()
    arrival_time: Date;

    price: number;
    passenger_class: CustomerClass;
}