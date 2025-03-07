import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {In, Repository} from 'typeorm';
import { Rental } from '../entities/rental.entity';
import { CreateRentalDto } from '../dto/create-rental.dto';
import { Bike } from '../../bike/entities/bike.entity';

@Injectable()
export class RentalService {
    constructor(
        @InjectRepository(Rental)
        private rentalRepository: Repository<Rental>,
        @InjectRepository(Bike)
        private bikeRepository: Repository<Bike>,
    ) {}

    async createRental(createRentalDto: CreateRentalDto): Promise<Rental> {
        const { userId, bikeId, startDate, endDate, totalPrice } = createRentalDto;

        const bike = await this.bikeRepository.findOne({ where: { id: bikeId } });
        if (!bike || bike.stock <= 0) {
            throw new NotFoundException('Bike is not available');
        }

        // Уменьшаем stock на 1
        bike.stock -= 1;

        // Если stock стал 0, меняем статус на 'unavailable'
        if (bike.stock === 0) {
            bike.availability_status = 'unavailable';
        }
        await this.bikeRepository.save(bike);

        const rental = this.rentalRepository.create({
            user: { id: userId },
            bike: { id: bikeId },
            startDate,
            endDate,
            totalPrice,
            status: 'on_payment',
        });

        return this.rentalRepository.save(rental);
    }

    async completeRental(id: number): Promise<Rental> {
        console.log('Looking for rental with ID:', id);

        const rental = await this.rentalRepository.findOne({
            where: { id },
            relations: ['bike'], // Загружаем связанную сущность bike
        });
        console.log('Rental retrieved:', rental);

        if (!rental) {
            throw new NotFoundException(`Rental with ID ${id} not found`);
        }

        if (!rental.bike) {
            throw new NotFoundException(`Bike associated with rental ID ${id} not found`);
        }

        rental.status = 'completed';
        await this.rentalRepository.save(rental);

        rental.bike.availability_status = 'available';
        await this.bikeRepository.save(rental.bike);

        return rental;
    }

    async activateRental(id: number): Promise<Rental> {
        const rental = await this.rentalRepository.findOne({
            where: { id },
            relations: ['bike'],
        });

        if (!rental) {
            throw new NotFoundException(`Rental with ID ${id} not found`);
        }

        if (!rental.bike) {
            throw new NotFoundException(`Bike associated with rental ID ${id} not found`);
        }

        rental.status = 'active';
        await this.rentalRepository.save(rental);

        // Если требуется, можно обновить статус велосипеда.
        // Например, если активная аренда подразумевает, что велосипед уже используется,
        // его статус может оставаться 'unavailable'.
        // rental.bike.availability_status = 'unavailable';
        // await this.bikeRepository.save(rental.bike);

        return rental;
    }

    async getAllRentals(): Promise<Rental[]> {
        return this.rentalRepository.find({ relations: ['bike', 'user'] });
    }

    async getActiveRentals(): Promise<Rental[]> {
        return this.rentalRepository.find({
            where: { status: 'active' },
            relations: ['bike', 'user'],
        });
    }

    async getRentalsByUser(userId: number): Promise<Rental[]> {
        return this.rentalRepository.find({
            where: { user: { id: userId } },
            relations: ['bike'],
        });
    }

    async getUserRentalHistory(userId: number): Promise<Rental[]> {
        return this.rentalRepository.find({
            where: { user: { id: userId }, status: In(['completed', 'cancelled']) },
            relations: ['bike'],
        });
    }

    async cancelRental(id: number): Promise<Rental> {
        const rental = await this.rentalRepository.findOne({
            where: { id },
            relations: ['bike'],
        });

        if (!rental) {
            throw new NotFoundException(`Rental with ID ${id} not found`);
        }

        if (rental.status !== 'active') {
            throw new BadRequestException('Only active rentals can be cancelled');
        }

        rental.status = 'cancelled';
        await this.rentalRepository.save(rental);

        rental.bike.availability_status = 'available';
        await this.bikeRepository.save(rental.bike);

        return rental;
    }

    async getRentalById(id: number): Promise<Rental> {
        const rental = await this.rentalRepository.findOne({
            where: { id },
            relations: ['bike', 'user'],
        });

        if (!rental) {
            throw new NotFoundException(`Rental with ID ${id} not found`);
        }

        return rental;
    }

    async isBikeAvailable(bikeId: number): Promise<boolean> {
        const bike = await this.bikeRepository.findOne({ where: { id: bikeId } });
        return bike?.availability_status === 'available';
    }
}