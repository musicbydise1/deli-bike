import { Repository } from 'typeorm';
import { Accessory } from '../entities/accessory.entity';
import { CreateAccessoryDto, UpdateAccessoryDto } from '../dto/accessory.dto';
export declare class AccessoriesService {
    private accessoryRepository;
    constructor(accessoryRepository: Repository<Accessory>);
    findAll(): Promise<Accessory[]>;
    findById(id: number): Promise<Accessory>;
    createAccessory(dto: CreateAccessoryDto): Promise<Accessory[]>;
    updateAccessory(id: number, dto: UpdateAccessoryDto): Promise<Accessory>;
    deleteAccessory(id: number): Promise<void>;
}
