import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Route } from "./route.entity";
import { Flight } from "./flight.entity";

@Entity("airline")
export class Airline {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    logoUrl: string;

    @Column()
    description: string;

    @Column()
    contactEmail: string;

    @OneToMany(type => Route, route => route.airline)
    routes: Route[];

    @OneToMany(type => Flight, flight => flight.airline)
    flights: Flight[];
}