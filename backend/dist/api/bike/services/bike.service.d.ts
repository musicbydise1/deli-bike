import { Repository } from 'typeorm';
import { Bike } from '../entities/bike.entity';
import { BikePrice } from '../entities/bike_price.entity';
import { CreateBikeDto } from '../dto/create-bike.dto';
export declare class BikeService {
    private bikeRepository;
    private bikePriceRepository;
    constructor(bikeRepository: Repository<Bike>, bikePriceRepository: Repository<BikePrice>);
    findAll(): Promise<Bike[]>;
    findOneById(id: number): Promise<Bike>;
    createBike(bikeData: CreateBikeDto): Promise<Bike>;
    updateBike(id: number, bikeData: Partial<CreateBikeDto & {
        prices?: {
            categoryId: number;
            price: number;
        }[];
    }>): Promise<Bike>;
    deleteBike(id: number): Promise<void>;
}
