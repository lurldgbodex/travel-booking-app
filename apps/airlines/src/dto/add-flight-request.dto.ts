import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { FlightStatus } from "../interfaces/flight-status.enum";
import { FlightPackage } from "../interfaces/package.interface";
import { CustomerClass } from "../interfaces/customer-type.enum";

export class AddFlightRequest {
    @IsDateString()
    @IsNotEmpty()
    departureTime: Date;

    @IsDateString()
    @IsNotEmpty()
    arrivalTime: Date;


    @IsEnum(FlightStatus)
    status: FlightStatus;

  
    @IsNotEmpty()
    @IsString()
    origin: string;

    @IsNotEmpty()
    @IsString()
    destination: string;

    @IsNotEmpty()
    @IsNumber()
    price; number;

    @IsNotEmpty()
    @IsEnum(CustomerClass)
    class_type: CustomerClass
}