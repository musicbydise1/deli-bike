import { Controller, Get, Patch, Post, Delete, Param, Body } from '@nestjs/common';
import { AdminService } from '../services/admin.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateBikeDto } from '../dto/create-bike.dto';
import { User } from '../../../database/entities/user.entity';
import { Bike } from '../../bike/entities/bike.entity';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Get('/users')
    async getAllUsers(): Promise<User[]> {
        return this.adminService.getAllUsers();
    }

    @Patch('/users/:id')
    async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.adminService.updateUser(id, updateUserDto);
    }

    @Post('/bikes')
    async createBike(@Body() createBikeDto: CreateBikeDto): Promise<Bike> {
        return this.adminService.createBike(createBikeDto);
    }

    @Delete('/bikes/:id')
    async deleteBike(@Param('id') id: number): Promise<void> {
        return this.adminService.deleteBike(id);
    }

    @Get('/analytics')
    async getAnalytics(): Promise<any> {
        return this.adminService.getAnalytics();
    }
}