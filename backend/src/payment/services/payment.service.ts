import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Payment } from "../entities/payment.entity";

import { CreatePaymentDto } from "../dto/create-payment.dto";
import { UpdatePaymentDto } from "../dto/update-payment.dto";

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const payment = this.paymentRepository.create(createPaymentDto);
    return this.paymentRepository.save(payment);
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentRepository.find();
  }

  async findOne(id: string): Promise<Payment> {
    const payment = await this.paymentRepository.findOne(id);
    if (!payment) {
      throw new NotFoundException("Payment not found");
    }
    return payment;
  }

  async update(
    id: string,
    updatePaymentDto: UpdatePaymentDto
  ): Promise<Payment> {
    const existingPayment = await this.paymentRepository.findOne(id);
    if (!existingPayment) {
      throw new NotFoundException("Payment not found");
    }
    return this.paymentRepository.save({
      ...existingPayment,
      ...updatePaymentDto,
    });
  }

  async remove(id: string): Promise<void> {
    const existingPayment = await this.paymentRepository.findOne(id);
    if (!existingPayment) {
      throw new NotFoundException("Payment not found");
    }
    await this.paymentRepository.delete(id);
  }

  async processPayment(id: string): Promise<any> {
    // Process payment logic here (e.g., connect to a payment gateway)
    const payment = await this.findOne(id);
    // Perform payment processing and return result
    return { message: `Payment ${id} processed successfully` };
  }

  async refundPayment(id: string): Promise<any> {
    // Refund payment logic here (e.g., connect to a payment gateway)
    const payment = await this.findOne(id);
    // Perform refund process and return result
    return { message: `Payment ${id} refunded successfully` };
  }
}
