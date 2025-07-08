import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { User } from '@/modules/users/entities/user.entity';
import { BikePrice } from '@/modules/bikes/entities/bike_price.entity';

@Entity()
export class Role {
  @PrimaryColumn()
  public id!: number;

  @Column({ type: 'varchar', length: 120, unique: true })
  public name: string;

  @ManyToMany(() => User, (user) => user.roles)
  public users: User[];

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;

  @OneToMany(() => BikePrice, (bikePrice) => bikePrice.role)
  bikePrices: BikePrice[];
}
