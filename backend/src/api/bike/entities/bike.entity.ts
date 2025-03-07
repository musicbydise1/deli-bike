import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany, ManyToMany
} from 'typeorm';

import { BikePrice } from './bike_price.entity';
import { Accessory } from '../../accessories/entities/accessory.entity';
import { Tariff } from '../../tariffs/entities/tariff.entity';

@Entity('bike')
export class Bike {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    model: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({
        name: 'availability_status',
        type: 'enum',
        enum: ['available', 'unavailable', 'rented', 'maintenance'],
        default: 'available',
    })
    availability_status: 'available' | 'unavailable' | 'rented' | 'maintenance';

    @Column({ name: 'max_speed', type: 'decimal', precision: 10, scale: 2, nullable: true })
    maxSpeed?: number;

    @Column({ name: 'range_per_charge', type: 'decimal', precision: 10, scale: 2, nullable: true })
    rangePerCharge?: number;

    @Column({ name: 'charge_time', type: 'varchar', length: 255, nullable: true })
    chargeTime?: string;

    @Column({ name: 'max_load', type: 'decimal', precision: 10, scale: 2, nullable: true })
    maxLoad?: number;

    @Column({ name: 'weight', type: 'decimal', precision: 10, scale: 2, nullable: true })
    weight?: number;

    @Column({ name: 'power', type: 'varchar', length: 255, nullable: true })
    power?: string;

    @Column({ name: 'suspension', type: 'varchar', length: 255, nullable: true })
    suspension?: string;

    @Column({ name: 'image_urls', type: 'text', array: true, default: '{}' })
    imageUrls: string[];

    @Column({ name: 'stock', type: 'integer', nullable: true })
    stock?: number;

    @Column({ name: 'tags', type: 'text', array: true, default: '{}' })
    tags: string[];

    @OneToMany(() => BikePrice, (bikePrice) => bikePrice.bike, { cascade: true })
    prices: BikePrice[];

    @OneToMany(() => Accessory, (accessory) => accessory.bike)
    accessories: Accessory[];

    @OneToMany(() => Tariff, tariff => tariff.bike)
    tariffs: Tariff[];


    @CreateDateColumn({ name: 'createdAt', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updatedAt', type: 'timestamp' })
    updatedAt: Date;
}
