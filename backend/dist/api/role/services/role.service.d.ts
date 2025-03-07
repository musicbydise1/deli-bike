import { Repository } from 'typeorm';
import { Role } from '../../../database/entities/role.entity';
import { AssignRoleDto } from '../dto/role.dto';
import { UserService } from '../../user/services/user.service';
export declare class RoleService {
    private readonly rolesRepository;
    private readonly userService;
    constructor(rolesRepository: Repository<Role>, userService: UserService);
    assignRoleToUser(data: AssignRoleDto): Promise<void>;
    findById(roleId: number): Promise<Role>;
}
