import { AccessoriesService } from '../services/accessories.service';
import { Accessory } from '../entities/accessory.entity';
import { CreateAccessoryDto, UpdateAccessoryDto } from '../dto/accessory.dto';
export declare class AccessoriesController {
    private readonly accessoriesService;
    constructor(accessoriesService: AccessoriesService);
    findAll(): Promise<Accessory[]>;
    findById(id: number): Promise<Accessory>;
    create(dto: CreateAccessoryDto): Promise<Accessory[]>;
    update(id: number, dto: UpdateAccessoryDto): Promise<Accessory>;
    delete(id: number): Promise<void>;
}
