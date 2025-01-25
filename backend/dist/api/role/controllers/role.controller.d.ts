import { AssignRoleDto } from '../dto/role.dto';
import { RoleService } from '../services/role.service';
export declare class RoleController {
    private readonly roleService;
    constructor(roleService: RoleService);
    assignRoleToUser(body: AssignRoleDto): Promise<void>;
}
