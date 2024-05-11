import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdatePaymentDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  rentalId: string;
}
