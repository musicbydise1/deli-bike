import { BikeService } from '../services/bike.service';
import { Bike } from '../entities/bike.entity';
import { CreateBikeDto } from '../dto/create-bike.dto';
import { File as MulterFile } from 'multer';
export declare class BikeController {
    private readonly bikeService;
    constructor(bikeService: BikeService);
    getAllBikes(): Promise<Bike[]>;
    getBikeById(id: number): Promise<Bike>;
    createBike(files: {
        photos?: MulterFile[];
    }, bikeData: CreateBikeDto): Promise<Bike>;
    updateBike(id: number, bikeData: Partial<CreateBikeDto>): Promise<Bike>;
    deleteBike(id: number): Promise<void>;
}
