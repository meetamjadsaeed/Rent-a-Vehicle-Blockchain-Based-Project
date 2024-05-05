import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
} from "@nestjs/common";
import { RentalService } from "./rental.service";
import { CreateRentalDto } from "./dto/create-rental.dto";
import { UpdateRentalDto } from "./dto/update-rental.dto";

@Controller("rentals")
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  @Get()
  async findAll() {
    return this.rentalService.findAll();
  }

  @Post()
  async create(@Body() createRentalDto: CreateRentalDto) {
    return this.rentalService.create(createRentalDto);
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.rentalService.findOne(id);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateRentalDto: UpdateRentalDto
  ) {
    return this.rentalService.update(id, updateRentalDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.rentalService.remove(id);
  }
}
