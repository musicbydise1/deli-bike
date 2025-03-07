"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../../../database/entities/user.entity");
const bike_entity_1 = require("../../bike/entities/bike.entity");
const rental_entity_1 = require("../../rental/entities/rental.entity");
const role_service_1 = require("../../role/services/role.service");
let AdminService = class AdminService {
    constructor(userRepository, bikeRepository, rentalRepository, roleService) {
        this.userRepository = userRepository;
        this.bikeRepository = bikeRepository;
        this.rentalRepository = rentalRepository;
        this.roleService = roleService;
    }
    async getAllUsers() {
        return this.userRepository.find({
            relations: ['roles'],
        });
    }
    async createUser(createUserDto) {
        const existing = await this.userRepository.findOne({ where: { email: createUserDto.email } });
        if (existing) {
            throw new common_1.BadRequestException('Пользователь с таким email уже существует');
        }
        const user = this.userRepository.create(createUserDto);
        if (createUserDto.password) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);
            user.password = hashedPassword;
        }
        const savedUser = await this.userRepository.save(user);
        let roleId;
        if (createUserDto.role === 'courier') {
            roleId = 1;
        }
        else if (createUserDto.role === 'corporate') {
            roleId = 2;
        }
        const userRole = await this.roleService.findById(roleId);
        await this.roleService.assignRoleToUser({
            roleId: userRole.id,
            userId: savedUser.id,
        });
        return savedUser;
    }
    async updateUser(id, updateUserDto) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        Object.assign(user, updateUserDto);
        return this.userRepository.save(user);
    }
    async createBike(createBikeDto) {
        const bike = this.bikeRepository.create(createBikeDto);
        return this.bikeRepository.save(bike);
    }
    async deleteBike(id) {
        const bike = await this.bikeRepository.findOne({ where: { id } });
        if (!bike) {
            throw new common_1.NotFoundException(`Bike with ID ${id} not found`);
        }
        await this.bikeRepository.remove(bike);
    }
    async getAnalytics() {
        const totalUsers = await this.userRepository.count();
        const activeUsers = await this.userRepository.count({
            where: { status: 'active' },
        });
        const activeRentals = await this.rentalRepository
            .createQueryBuilder('rental')
            .where('rental.status = :status', { status: 'active' })
            .getCount();
        const result = await this.rentalRepository
            .createQueryBuilder('rental')
            .select('SUM(rental.totalPrice)', 'sum')
            .where('rental.status IN (:...statuses)', {
            statuses: ['active', 'completed'],
        })
            .getRawOne();
        const sumTotalPrice = parseFloat(result.sum) || 0;
        const now = new Date();
        const daysAgo = (days) => {
            const d = new Date(now);
            d.setDate(d.getDate() - days);
            return d;
        };
        const getRentalsGroupedByDay = async (days) => {
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
        const oneWeekRentals = await getRentalsGroupedByDay(7);
        const twoWeeksRentals = await getRentalsGroupedByDay(14);
        const oneMonthRentals = await getRentalsGroupedByDay(30);
        return {
            totalUsers,
            activeUsers,
            activeRentals,
            sumTotalPrice,
            oneWeekRentals,
            twoWeeksRentals,
            oneMonthRentals,
        };
    }
};
AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(bike_entity_1.Bike)),
    __param(2, (0, typeorm_1.InjectRepository)(rental_entity_1.Rental)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        role_service_1.RoleService])
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map