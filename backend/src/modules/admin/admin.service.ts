import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Rental } from '../rentals/entities/rental.entity';
import { RentalStatus } from '../rentals/enums/rental-status.enum';

export interface RentalStats {
  totalUsers: number;
  activeRentals: number;
  completedRentals: number;
}

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Rental)
    private readonly rentalRepository: Repository<Rental>,
  ) {}

  getAllUsers(): Promise<User[]> {
    return this.userRepository.find({ relations: ['roles'] });
  }

  async getRentalStats(): Promise<RentalStats> {
    const totalUsers = await this.userRepository.count();
    const activeRentals = await this.rentalRepository.count({
      where: { status: RentalStatus.Active },
    });
    const completedRentals = await this.rentalRepository.count({
      where: { status: RentalStatus.Completed },
    });

    return { totalUsers, activeRentals, completedRentals };
  }
}
