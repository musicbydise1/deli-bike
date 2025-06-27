import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
} from 'typeorm';
import { Accessory } from './accessory.entity';
import { PriceCategory } from '../../../modules/pricing/price-categories/entities/price-category.entity';
import { Role } from '../../../database/entities/role.entity';
import { Currency } from '../../../modules/pricing/currency/entities/currency.entity';

@Entity('accessories_price')
export class AccessoriesPrice {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Accessory, (accessory) => accessory.prices, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'accessoriesId' })
    accessory: Accessory;

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