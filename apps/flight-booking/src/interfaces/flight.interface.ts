import { BookingStatus } from "./flight-status.enum.";

export interface Flight {
    readonly _id?: string;
    readonly flight_id: number;
    readonly user_id: number;
    readonly status: BookingStatus;
    readonly created_at: Date;
}