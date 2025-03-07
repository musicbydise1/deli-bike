import { RentalService } from '../services/rental.service';
import { CreateRentalDto } from '../dto/create-rental.dto';
import { Rental } from '../entities/rental.entity';
export declare class RentalController {
    private readonly rentalService;
    constructor(rentalService: RentalService);
    createRental(createRentalDto: CreateRentalDto): Promise<Rental>;
    completeRental(id: number): Promise<Rental>;
    getAllRentals(): Promise<Rental[]>;
    getActiveRentals(): Promise<Rental[]>;
    getRentalsByUser(userId: number): Promise<Rental[]>;
    getUserRentalHistory(userId: number): Promise<Rental[]>;
    activateRental(id: number): Promise<Rental>;
    cancelRental(id: number): Promise<Rental>;
    getRentalById(id: number): Promise<Rental>;
    checkBikeAvailability(bikeId: number): Promise<boolean>;
}
