import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";
import { RouteType } from "../entity/route-type.enum";

export class AddRouteDto {
    @IsString()
    @IsNotEmpty()
    origin: string;

    @IsString()
    @IsNotEmpty()
    destination: string;

    @IsString()
    @IsEnum(RouteType)
    type: RouteType

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsDateString()
    departure_time: Date;

    @IsDateString()
    arrival_time: Date;
}