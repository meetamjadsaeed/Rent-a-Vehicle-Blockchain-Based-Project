import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RentalTransaction } from "./rental.entity";
import { RentalController } from "./rental.controller";
import { RentalService } from "./rental.service";

@Module({
  imports: [TypeOrmModule.forFeature([RentalTransaction])],
  controllers: [RentalController],
  providers: [RentalService],
})
export class RentalModule {}
