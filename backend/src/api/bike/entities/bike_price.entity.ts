import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Bike } from './bike.entity';
import { PriceCategory } from './price_category.entity';

@Entity('bike_price')
export class BikePrice {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Bike, (bike) => bike.prices, { onDelete: 'CASCADE' })
    bike: Bike;

    @ManyToOne(() => PriceCategory, { onDelete: 'CASCADE' })
    priceCategory: PriceCategory; // Убираем @Column, так как связь определена через @ManyToOne

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @CreateDateColumn({ name: 'createdAt', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updatedAt', type: 'timestamp' })
    updatedAt: Date;
}