import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn, OneToMany,
} from 'typeorm';
import { Bike } from '../../modules/bikes/entities/bike.entity';
import {AccessoriesPrice} from "./accessories_price.entity";

@Entity('accessories')
export class Accessory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    bikeId: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @ManyToOne(() => Bike, (bike) => bike.accessories, { nullable: false })
    @JoinColumn({ name: 'bikeId' })
    bike: Bike;

    @OneToMany(() => AccessoriesPrice, (accessories) => accessories.accessory, { cascade: true })
    prices: AccessoriesPrice[];
}