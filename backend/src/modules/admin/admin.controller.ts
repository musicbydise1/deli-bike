import { Controller, Get } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { Auth } from "../../shared/guards/auth.decorator";
import { RoleIds } from "../../shared/constants/roles.enum";

@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Auth(RoleIds.Admin)
  @Get("users")
  getUsers() {
    return this.adminService.getAllUsers();
  }

  @Auth(RoleIds.Admin)
  @Get("rental-stats")
  getStats() {
    return this.adminService.getRentalStats();
  }
}
