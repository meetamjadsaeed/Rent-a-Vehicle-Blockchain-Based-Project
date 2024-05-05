import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { RentalModule } from "./rental/rental.module";
import { VehicleModule } from "./vehical/vehicle.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mongodb",
      host: "localhost",
      port: 27017,
      database: "rent-a-vehicle",
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    MongooseModule.forRoot("mongodb://localhost/rent-a-vehicle"),
    AuthModule,
    VehicleModule,
    RentalModule,
  ],
})
export class AppModule {}
