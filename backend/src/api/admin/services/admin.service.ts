import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../database/entities/user.entity';
import { Bike } from '../../bike/entities/bike.entity';
import { Rental } from '../../rental/entities/rental.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateBikeDto } from '../dto/create-bike.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { RoleService } from '../../role/services/role.service';
import { UserService } from '../../user/services/user.service';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(Bike)
        private bikeRepository: Repository<Bike>,

        @InjectRepository(Rental)
        private rentalRepository: Repository<Rental>,

        private readonly roleService: RoleService,
        private readonly userService: UserService,
    ) {}

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.find({
            relations: ['roles'], // укажите здесь точное имя поля, которое описывает связь
        });
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        // 1. Проверяем, нет ли уже пользователя с таким email
        const existing = await this.userRepository.findOne({ where: { email: createUserDto.email } });
        if (existing) {
            throw new BadRequestException('Пользователь с таким email уже существует');
        }

        // Определяем, какую роль присвоить
        let roleId: number;
        if (createUserDto.role === 'courier') {
            roleId = 1;
        } else if (createUserDto.role === 'corporate') {
            roleId = 2;
        }

        const userRole = await this.roleService.findById(roleId);

        const newUser = await this.userService.createUser({
            phoneNumber: createUserDto.phoneNumber,
            firstName: createUserDto.firstName,
            lastName: createUserDto.lastName,
            patronymic: createUserDto.patronymic,
            email: createUserDto.email,
            password: createUserDto.password,
            companyName: createUserDto.companyName,
            telegramChatId: createUserDto.telegramChatId,
            idCardNumber: createUserDto.idCardNumber,
            idCardFrontImage: createUserDto.idCardFrontImage,
            idCardBackImage: createUserDto.idCardBackImage,
        }, userRole);

        return newUser;
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        Object.assign(user, updateUserDto);
        return this.userRepository.save(user);
    }

    async createBike(createBikeDto: CreateBikeDto): Promise<Bike> {
        const bike = this.bikeRepository.create(createBikeDto);
        return this.bikeRepository.save(bike);
    }

    async deleteBike(id: number): Promise<void> {
        const bike = await this.bikeRepository.findOne({ where: { id } });
        if (!bike) {
            throw new NotFoundException(`Bike with ID ${id} not found`);
        }

        await this.bikeRepository.remove(bike);
    }

    async getAnalytics(): Promise<any> {
        // 1. Общее количество пользователей
        const totalUsers = await this.userRepository.count();

        // 2. Количество пользователей со статусом "active"
        const activeUsers = await this.userRepository.count({
            where: { status: 'active' },
        });

        // 3. Количество аренд со статусом "active"
        const activeRentals = await this.rentalRepository
            .createQueryBuilder('rental')
            .where('rental.status = :status', { status: 'active' })
            .getCount();

        // 4. Сумма total_price для аренды, где статус = "active" или "completed"
        const result = await this.rentalRepository
            .createQueryBuilder('rental')
            .select('SUM(rental.totalPrice)', 'sum')
            .where('rental.status IN (:...statuses)', {
                statuses: ['active', 'completed'],
            })
            .getRawOne();
        const sumTotalPrice = parseFloat(result.sum) || 0;

        // ------------------------------------------------------
        // ФИЛЬТРАЦИЯ и ГРУППИРОВКА по дням для (1 неделя, 2 недели, 1 месяц)
        // ------------------------------------------------------

        // Текущая дата
        const now = new Date();

        // Функция "N дней назад"
        const daysAgo = (days: number) => {
            const d = new Date(now);
            d.setDate(d.getDate() - days);
            return d;
        };

        // Универсальная функция для группировки аренды по дням и статусу
        // за последние N дней
        const getRentalsGroupedByDay = async (days: number) => {
            return this.rentalRepository
                .createQueryBuilder('rental')
                .select(`DATE_TRUNC('day', rental.createdAt)`, 'day')
                .addSelect('rental.status', 'status')
                .addSelect('COUNT(*)', 'count')
                .where('rental.createdAt >= :dateFrom', { dateFrom: daysAgo(days) })
                .andWhere('rental.status IN (:...statuses)', {
                    statuses: ['active', 'completed'],
                })
                .groupBy('day')
                .addGroupBy('rental.status')
                .orderBy('day', 'ASC')
                .getRawMany();
        };

        // Вызываем для 7, 14, 30 дней
        const oneWeekRentals = await getRentalsGroupedByDay(7);
        const twoWeeksRentals = await getRentalsGroupedByDay(14);
        const oneMonthRentals = await getRentalsGroupedByDay(30);

        return {
            totalUsers,
            activeUsers,
            activeRentals,
            sumTotalPrice,
            // Новые поля: список аренды по дням и статусу
            oneWeekRentals,
            twoWeeksRentals,
            oneMonthRentals,
        };
    }
}