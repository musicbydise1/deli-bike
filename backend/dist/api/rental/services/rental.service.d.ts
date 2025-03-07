import { Repository } from 'typeorm';
import { Rental } from '../entities/rental.entity';
import { CreateRentalDto } from '../dto/create-rental.dto';
import { Bike } from '../../bike/entities/bike.entity';
export declare class RentalService {
    private rentalRepository;
    private bikeRepository;
    constructor(rentalRepository: Repository<Rental>, bikeRepository: Repository<Bike>);
    createRental(createRentalDto: CreateRentalDto): Promise<Rental>;
    completeRental(id: number): Promise<Rental>;
    activateRental(id: number): Promise<Rental>;
    getAllRentals(): Promise<Rental[]>;
    getActiveRentals(): Promise<Rental[]>;
    getRentalsByUser(userId: number): Promise<Rental[]>;
    getUserRentalHistory(userId: number): Promise<Rental[]>;
    cancelRental(id: number): Promise<Rental>;
    getRentalById(id: number): Promise<Rental>;
    isBikeAvailable(bikeId: number): Promise<boolean>;
}
