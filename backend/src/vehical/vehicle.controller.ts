import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
} from "@nestjs/common";
import { VehicleService } from "./vehicle.service";
import { CreateVehicleDto } from "./dto/create-vehicle.dto";
import { UpdateVehicleDto } from "./dto/update-vehicle.dto";

@Controller("vehicles")
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get()
  async findAll() {
    return this.vehicleService.findAll();
  }

  @Post()
  async create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehicleService.create(createVehicleDto);
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.vehicleService.findOne(id);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateVehicleDto: UpdateVehicleDto
  ) {
    return this.vehicleService.update(id, updateVehicleDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.vehicleService.remove(id);
  }
}
