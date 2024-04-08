import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type FlightBookingDocument = HydratedDocument<FlightBooking>;

@Schema()
export class FlightBooking {
    @Prop()
    name: String;
    
    @Prop()
    flightNumber: string;

    @Prop()
    origin: string;

    @Prop()
    destination: string;

    @Prop()
    departureDay: Date;

    @Prop()
    departureTime: Date;

    @Prop()
    arrivalTime: Date;
}

export const FlightBookingSchema = SchemaFactory.createForClass(FlightBooking);