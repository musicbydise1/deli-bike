import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
} from 'typeorm';
import { Bike } from './bike.entity';
import { PriceCategory } from '../../pricing/price-categories/entities/price-category.entity';
import { Role } from '../../../database/entities/role.entity';
import { Currency } from '../../pricing/currency/entities/currency.entity';

@Entity('bike_price')
export class BikePrice {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Bike, (bike) => bike.prices, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'bikeId' })
    bike: Bike;

    @ManyToOne(() => PriceCategory, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'priceCategoryId' })
    priceCategory: PriceCategory;

    // === Добавляем связь с Role
    @ManyToOne(() => Role, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'roleId' })
    role: Role;

    // === Добавляем связь с Currency
    @ManyToOne(() => Currency, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'currency_id' })
    currency: Currency;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @CreateDateColumn({ name: 'createdAt', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updatedAt', type: 'timestamp' })
    updatedAt: Date;
}