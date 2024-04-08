import { Module } from '@nestjs/common';
import { AirlinesController } from './controller/airlines.controller';
import { AirlinesService } from './service/airlines.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Airline } from './entity/airline.entity';
import { Route } from './entity/route.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './modules/database.module';
import { AirlineConfigModule } from './modules/config.module';
import { RouteService } from './service/routes.service';

@Module({
  imports: [
    AirlineConfigModule,
    // DatabaseModule,
    
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Lurldgb@de$',
      database: 'airline',
      entities: [Airline, Route],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Airline, Route]),
  ],
  controllers: [AirlinesController],
  providers: [AirlinesService, RouteService],
})
export class AirlinesModule {}
