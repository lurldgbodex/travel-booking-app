import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Airline } from "./airline.entity";
import { RouteType } from "./route-type.enum";

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

    @Column()
    price: number;

    @Column()
    departureTime: Date;

    @Column()
    arrivalTime: Date;

    @ManyToOne(() => Airline, Airline => Airline.routes, {
        cascade: true
    })
    @JoinColumn()
    airline: Airline;
}