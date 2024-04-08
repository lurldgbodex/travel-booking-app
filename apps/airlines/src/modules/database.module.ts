import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Airline } from "../entity/airline.entity";
import { Route } from "../entity/route.entity";
import { ConnectionOptions } from "mysql2";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get<string>('DB_HOST'),
                port: configService.get<number>('DB_PORT'),
                username: configService.get<string>('DB_USER'),
                password: configService.get<string>('DB_PASSWROD'),
                database: configService.get<string>('DATABASE'),
                entities: [Airline, Route],
                synchronize: true,
            } as ConnectionOptions),
        }),
    ],
})
export class DatabaseModule {}