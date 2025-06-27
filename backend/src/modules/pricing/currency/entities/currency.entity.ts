import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { BikePrice } from '../../../bikes/entities/bike_price.entity';

@Entity('currency')
export class Currency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 10, unique: true })
  code: string; // Например, 'USD', 'KZT', 'BYN' и т.д.

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => BikePrice, (bp) => bp.currency)
  bikePrices: BikePrice[];
}