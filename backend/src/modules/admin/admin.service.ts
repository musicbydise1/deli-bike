import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Rental } from '../rentals/entities/rental.entity';

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

  async getRentalStats(): Promise<any> {
    const totalUsers = await this.userRepository.count();
    const activeRentals = await this.rentalRepository.count({
      where: { status: 'active' },
    });
    const completedRentals = await this.rentalRepository.count({
      where: { status: 'completed' },
    });

    return { totalUsers, activeRentals, completedRentals };
  }
}
