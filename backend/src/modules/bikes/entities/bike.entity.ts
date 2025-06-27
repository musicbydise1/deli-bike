import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { BikePrice } from "./bike_price.entity";
import { Accessory } from "../../accessories/entities/accessory.entity";
import { Tariff } from "../../pricing/tariffs/entities/tariff.entity";

@Entity("bike")
export class Bike {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  model: string;

  @Column({
    name: "availability_status",
    type: "enum",
    enum: ["available", "unavailable", "rented", "maintenance"],
    default: "available",
  })
  availability_status: "available" | "unavailable" | "rented" | "maintenance";

  @Column({ name: "stock", type: "integer", default: 0 })
  stock: number;

  @Column({ name: "max_speed", type: "decimal", precision: 10, scale: 2 })
  max_speed: number;

  @Column({ name: "range_per_charge", type: "varchar", length: 255 })
  range_per_charge: string;

  @Column({ name: "charge_time", type: "varchar", length: 255 })
  charge_time: string;

  @Column({ name: "max_load", type: "decimal", precision: 10, scale: 2 })
  max_load: number;

  @Column({ name: "weight", type: "decimal", precision: 10, scale: 2 })
  weight: number;

  @Column({ name: "power", type: "varchar", length: 255 })
  power: string;

  @Column({ name: "suspension", type: "varchar", length: 255 })
  suspension: string;

  @Column({ name: "brakes", type: "varchar", length: 255 })
  brakes: string;

  @Column({ name: "image_urls", type: "text", array: true, default: "{}" })
  imageUrls: string[];

  @Column({ name: "tags", type: "text", array: true, default: "{}" })
  tags: string[];

  @CreateDateColumn({ name: "createdAt", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updatedAt", type: "timestamp" })
  updatedAt: Date;

  // Ниже — связи, не влияющие на структуру столбцов "bike", но позволяющие
  // удобно загружать связанные данные (bike_price, accessories, tariffs).
  // Если хотите, их можно убрать — миграция "bike" не описывает прямых внешних ключей.

  @OneToMany(() => BikePrice, (bikePrice) => bikePrice.bike, { cascade: true })
  prices: BikePrice[];

  @OneToMany(() => Accessory, (accessory) => accessory.bike, { cascade: true })
  accessories: Accessory[];

  @OneToMany(() => Tariff, (tariff) => tariff.bike, { cascade: true })
  tariffs: Tariff[];
}
