import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Airline } from "./airline.entity";
import { FlightPackage } from "../interfaces/package.interface";
import { FlightStatus } from "../interfaces/flight-status.enum";

@Entity()
export class Flight {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    departureTime: Date;

    @Column()
    arrivalTime: Date;

    @Column({ type: 'enum', enum: FlightStatus})
    status: FlightStatus;

    @Column()
    origin: string;

    @Column()
    destination: string;

    @Column()
    package: FlightPackage;
    
    @ManyToOne(() => Airline, airline => airline.flights, {cascade: true})
    airline: Airline;
}