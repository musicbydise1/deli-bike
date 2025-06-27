import { Controller, Post, Patch, Param, Body, Get } from "@nestjs/common";
import { ParseIntPipe } from "@nestjs/common";
import { Auth } from "../../shared/guards/auth.decorator";
import { RoleIds } from "../../shared/constants/roles.enum";
import { RentalService } from "./rentals.service";
import { CreateRentalDto } from "./dto/create-rental.dto";
import { Rental } from "./entities/rental.entity";

@Controller("rentals")
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  @Auth()
  @Post()
  async createRental(
    @Body() createRentalDto: CreateRentalDto
  ): Promise<Rental> {
    return this.rentalService.createRental(createRentalDto);
  }

  @Auth(RoleIds.Admin)
  @Patch(":id/complete")
  async completeRental(@Param("id", ParseIntPipe) id: number): Promise<Rental> {
    return this.rentalService.completeRental(id);
  }

  @Auth(RoleIds.Admin)
  @Get()
  async getAllRentals(): Promise<Rental[]> {
    return this.rentalService.getAllRentals();
  }

  @Auth(RoleIds.Admin)
  @Get("/active")
  async getActiveRentals(): Promise<Rental[]> {
    return this.rentalService.getActiveRentals();
  }

  @Auth()
  @Get("/user/:userId")
  async getRentalsByUser(@Param("userId") userId: number): Promise<Rental[]> {
    return this.rentalService.getRentalsByUser(userId);
  }

  @Auth()
  @Get("/user/:userId/history")
  async getUserRentalHistory(
    @Param("userId") userId: number
  ): Promise<Rental[]> {
    return this.rentalService.getUserRentalHistory(userId);
  }

  @Auth(RoleIds.Admin)
  @Patch(":id/activate")
  async activateRental(@Param("id", ParseIntPipe) id: number): Promise<Rental> {
    return this.rentalService.activateRental(id);
  }

  @Auth(RoleIds.Admin)
  @Patch(":id/cancel")
  async cancelRental(@Param("id") id: number): Promise<Rental> {
    return this.rentalService.cancelRental(id);
  }

  @Auth(RoleIds.Admin)
  @Get(":id")
  async getRentalById(@Param("id") id: number): Promise<Rental> {
    return this.rentalService.getRentalById(id);
  }

  @Get("/bikes/:bikeId/availability")
  async checkBikeAvailability(
    @Param("bikeId") bikeId: number
  ): Promise<boolean> {
    return this.rentalService.isBikeAvailable(bikeId);
  }
}
