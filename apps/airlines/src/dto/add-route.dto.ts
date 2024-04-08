import { IsEnum, IsNotEmpty, IsString } from "class-validator";
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
}