import { Repository } from 'typeorm';
import { User } from '../../../database/entities/user.entity';
import { Bike } from '../../bike/entities/bike.entity';
import { Rental } from '../../rental/entities/rental.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateBikeDto } from '../dto/create-bike.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { RoleService } from '../../role/services/role.service';
export declare class AdminService {
    private userRepository;
    private bikeRepository;
    private rentalRepository;
    private readonly roleService;
    constructor(userRepository: Repository<User>, bikeRepository: Repository<Bike>, rentalRepository: Repository<Rental>, roleService: RoleService);
    getAllUsers(): Promise<User[]>;
    createUser(createUserDto: CreateUserDto): Promise<User>;
    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    createBike(createBikeDto: CreateBikeDto): Promise<Bike>;
    deleteBike(id: number): Promise<void>;
    getAnalytics(): Promise<any>;
}
