import { Repository } from 'typeorm';
import { Role } from 'src/database/entities/role.entity';
import { AssignRoleDto } from '../dto/role.dto';
import { UserService } from 'src/api/user/services/user.service';
export declare class RoleService {
    private readonly rolesRepository;
    private readonly userService;
    constructor(rolesRepository: Repository<Role>, userService: UserService);
    assignRoleToUser(data: AssignRoleDto): Promise<import("../../../database/entities/user.entity").User>;
    findById(roleId: number): Promise<Role>;
}
