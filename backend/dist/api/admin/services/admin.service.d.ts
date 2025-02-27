import { Repository } from 'typeorm';
import { User } from '../../../database/entities/user.entity';
import { Bike } from '../../bike/entities/bike.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateBikeDto } from '../dto/create-bike.dto';
export declare class AdminService {
    private userRepository;
    private bikeRepository;
    constructor(userRepository: Repository<User>, bikeRepository: Repository<Bike>);
    getAllUsers(): Promise<User[]>;
    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    createBike(createBikeDto: CreateBikeDto): Promise<Bike>;
    deleteBike(id: number): Promise<void>;
    getAnalytics(): Promise<any>;
}
