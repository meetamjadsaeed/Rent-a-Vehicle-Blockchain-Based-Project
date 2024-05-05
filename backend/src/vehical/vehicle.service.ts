import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Vehicle } from "./vehicle.entity";
import { CreateVehicleDto } from "./dto/create-vehicle.dto";
import { UpdateVehicleDto } from "./dto/update-vehicle.dto";

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>
  ) {}

  async findAll(): Promise<Vehicle[]> {
    return this.vehicleRepository.find();
  }

  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    const vehicle = this.vehicleRepository.create(createVehicleDto);
    return this.vehicleRepository.save(vehicle);
  }

  async findOne(id: string): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findOne(id);
    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }
    return vehicle;
  }

  async update(
    id: string,
    updateVehicleDto: UpdateVehicleDto
  ): Promise<Vehicle> {
    const existingVehicle = await this.vehicleRepository.findOne(id);
    if (!existingVehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }
    const updatedVehicle = Object.assign(existingVehicle, updateVehicleDto);
    return this.vehicleRepository.save(updatedVehicle);
  }

  async remove(id: string): Promise<void> {
    const result = await this.vehicleRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }
  }
}
