export interface Flight {
    readonly _id?: string;
    readonly flightNumber: string;
    readonly origin: string;
    readonly destination: string;
    readonly departureTime: Date;
    readonly arrivalTime: Date;
}