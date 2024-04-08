import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { BookingStatus } from "../interfaces/flight-status.enum.";

export type FlightDocument = HydratedDocument<Booking>;

@Schema()
export class Booking {
    @Prop()
    userId: number;
    
    @Prop()
    flightId: number;

    @Prop()
    status: BookingStatus

    @Prop()
    createdAt: Date;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);