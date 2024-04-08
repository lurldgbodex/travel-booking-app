import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateRouteData {
   
    @IsString()
    origin: string;

    @IsString()
    destination: string;

    @IsNumber()
    price: number;

    @IsDateString()
    departureTime: Date;

    @IsDateString()
    arrivalTime: Date;
}