import { IsEnum, IsString } from "class-validator";
import { RouteType } from "../entity/route-type.enum";

export class UpdateRouteData {
   
    @IsString()
    origin: string;

    @IsString()
    destination: string;

    @IsEnum(RouteType)
    type: RouteType;
}