import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RentalTransaction } from "./rental.entity";
import { UpdateRentalDto } from "./dto/update-rental.dto";
import { CreateRentalDto } from "./dto/create-rental.dto";

@Injectable()
export class RentalService {
  constructor(
    @InjectRepository(RentalTransaction)
    private readonly rentalRepository: Repository<RentalTransaction>
  ) {}

  async findAll(): Promise<RentalTransaction[]> {
    return this.rentalRepository.find();
  }

  async create(createRentalDto: CreateRentalDto): Promise<RentalTransaction> {
    const newRental = this.rentalRepository.create(createRentalDto);
    return this.rentalRepository.save(newRental);
  }

  async findOne(id: string): Promise<RentalTransaction> {
    const rental = await this.rentalRepository.findOne(id);
    if (!rental) {
      throw new NotFoundException(`Rental transaction with ID ${id} not found`);
    }
    return rental;
  }

  async update(
    id: string,
    updateRentalDto: UpdateRentalDto
  ): Promise<RentalTransaction> {
    const existingRental = await this.rentalRepository.findOne(id);
    if (!existingRental) {
      throw new NotFoundException(`Rental transaction with ID ${id} not found`);
    }
    const updatedRental = Object.assign(existingRental, updateRentalDto);
    return this.rentalRepository.save(updatedRental);
  }

  async remove(id: string): Promise<void> {
    const result = await this.rentalRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Rental transaction with ID ${id} not found`);
    }
  }
}
