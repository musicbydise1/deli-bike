import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
} from 'typeorm';
import { User } from '../../../database/entities/user.entity';
import { Bike } from '../../bike/entities/bike.entity';
import {Role} from "../../../database/entities/role.entity";
import {PriceCategory} from "../../price-category/entities/price-category.entity";
import {Currency} from "../../currency/entities/currency.entity";

export type RentalStatus = 'on_payment' | 'active' | 'completed' | 'cancelled';

@Entity('rental')
export class Rental {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => Bike, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'bikeId' })
    bike: Bike;

    @ManyToOne(() => Role, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'roleId' })
    role: Role;

    @ManyToOne(() => PriceCategory, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'priceCategoryId' })
    priceCategory: PriceCategory;

    @ManyToOne(() => Currency, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'currency_id' })
    currency: Currency;

    @Column({ name: 'start_date', type: 'timestamp' })
    startDate: Date;

    @Column({ name: 'end_date', type: 'timestamp' })
    endDate: Date;

    @Column({ name: 'total_price', type: 'decimal', precision: 10, scale: 2 })
    totalPrice: number;

    @Column({ type: 'enum', enum: ['on_payment', 'active', 'completed', 'cancelled'], default: 'on_payment' })
    status: RentalStatus;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}