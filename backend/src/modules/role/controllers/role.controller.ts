import { Body, Controller, Post } from '@nestjs/common';
import { Auth } from '../../../shared/guards/auth.decorator';
import { AssignRoleDto } from '../dto/role.dto';
import { RoleIds } from '../../../shared/constants/roles.enum';
import { RoleService } from '../services/role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Auth(RoleIds.Admin)
  @Post('assign')
  async assignRoleToUser(@Body() body: AssignRoleDto) {
    return this.roleService.assignRoleToUser(body);
  }
}
