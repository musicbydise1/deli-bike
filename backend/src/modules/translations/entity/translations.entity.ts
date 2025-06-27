import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from "typeorm";

@Entity("translations")
@Unique("UQ_translations_entity_field_lang", [
  "entityType",
  "entityId",
  "field",
  "language",
])
export class Translation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  entityType: string; // "bike", "accessory", "price_category"

  @Column()
  entityId: number;

  @Column()
  field: string; // "name", "description", ...

  @Column()
  language: string; // "ru", "en", ...

  @Column({ type: "text" })
  translation: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
