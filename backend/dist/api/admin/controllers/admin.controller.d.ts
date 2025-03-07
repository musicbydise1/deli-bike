import { AdminService } from '../services/admin.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateBikeDto } from '../dto/create-bike.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../../../database/entities/user.entity';
import { Bike } from '../../bike/entities/bike.entity';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getAllUsers(): Promise<User[]>;
    createUser(createUserDto: CreateUserDto): Promise<User>;
    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    createBike(createBikeDto: CreateBikeDto): Promise<Bike>;
    deleteBike(id: number): Promise<void>;
    getAnalytics(): Promise<any>;
}
