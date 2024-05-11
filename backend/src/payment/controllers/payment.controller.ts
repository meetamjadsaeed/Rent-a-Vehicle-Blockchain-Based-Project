import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from "@nestjs/common";

import { PaymentService } from "../services/payment.service";

import { CreatePaymentDto } from "../dto/create-payment.dto";
import { UpdatePaymentDto } from "../dto/update-payment.dto";

@Controller("payments")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.paymentService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(id, updatePaymentDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.paymentService.remove(id);
  }

  @Post(":id/process")
  processPayment(@Param("id") id: string) {
    return this.paymentService.processPayment(id);
  }

  @Post(":id/refund")
  refundPayment(@Param("id") id: string) {
    return this.paymentService.refundPayment(id);
  }
}
