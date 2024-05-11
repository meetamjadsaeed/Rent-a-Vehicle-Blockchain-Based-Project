import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  rentalId: string;
}
