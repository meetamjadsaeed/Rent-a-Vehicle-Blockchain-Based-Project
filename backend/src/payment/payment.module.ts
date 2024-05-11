// src/payment/payment.module.ts
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Payment } from "./entities/payment.entity";
import { PaymentService } from "./services/payment.service";
import { PaymentController } from "./controllers/payment.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Payment])],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
