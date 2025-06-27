import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Role } from "../../../database/entities/role.entity";
import { AssignRoleDto } from "../dto/role.dto";
import { UserService } from "../../users/users.service";
import { errorMessages } from "../../../shared/constants/error-messages";

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly rolesRepository: Repository<Role>,
    private readonly userService: UserService
  ) {}

  async assignRoleToUser(data: AssignRoleDto) {
    const role = await this.findById(data.roleId);
    const user = await this.userService.findById(data.userId, {
      relations: ["roles"],
    });
    if (!user.roles.some((userRole) => userRole.id === data.roleId)) {
      user.roles.push(role);
      await this.userService.save(user);
    }
  }

  async findById(roleId: number) {
    const role = await this.rolesRepository.findOne({
      where: {
        id: roleId,
      },
    });
    if (!role) {
      throw new NotFoundException(errorMessages.role.notFound);
    }
    return role;
  }
}
