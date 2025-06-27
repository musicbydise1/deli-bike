import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("price_category")
export class PriceCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255, unique: true })
  name: string;

  @Column({ name: "rental_duration", type: "decimal" })
  rental_duration: number;

  @CreateDateColumn({ name: "createdAt", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updatedAt", type: "timestamp" })
  updatedAt: Date;
}
