import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateAirlineDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    logoUrl: string;

    @IsNotEmpty()
    @IsString()
    description: string;
    
    @IsEmail()
    @IsNotEmpty()
    contactEmail: string;
}