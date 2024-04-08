import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class BookFlightRequest {
   
    @IsString()
    @IsNotEmpty()
    name: String;

    @IsString()
    @IsNotEmpty()
    origin: string;

    @IsString()
    @IsNotEmpty()
    destination: string;

    @IsDate()
    departureDay: Date;
}