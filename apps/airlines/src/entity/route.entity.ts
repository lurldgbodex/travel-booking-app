import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Airline } from "./airline.entity";
import { RouteType } from "./route-type.enum";
import { Flight } from "./flight.entity";

@Entity('routes')
export class Route {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'enum', enum: RouteType })
    type: RouteType;

    @Column()
    origin: string;

    @Column()
    destination: string;

    @ManyToOne(() => Airline, airline => airline.routes, {
        cascade: true
    })
    @JoinColumn()
    airline: Airline;
}