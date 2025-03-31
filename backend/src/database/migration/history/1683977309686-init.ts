import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Init1683977309684 implements MigrationInterface {
    name = 'Init1683977309684';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // ========= Создаем ENUM типы =========
        await queryRunner.query(`CREATE TYPE "user_status_enum" AS ENUM('active', 'suspended', 'deleted')`);
        await queryRunner.query(`CREATE TYPE "user_payment_status_enum" AS ENUM('pending', 'completed', 'failed')`);
        await queryRunner.query(`CREATE TYPE "availability_status_enum" AS ENUM('available', 'unavailable', 'rented', 'maintenance')`);
        await queryRunner.query(`CREATE TYPE "rental_status_enum" AS ENUM('on_payment', 'active', 'completed', 'cancelled', 'maintenance')`);
        await queryRunner.query(`CREATE TYPE "payment_status_enum" AS ENUM('pending', 'completed', 'failed')`);
        await queryRunner.query(`CREATE TYPE "maintenance_status_enum" AS ENUM('scheduled', 'in_progress', 'completed')`);

        // ========= Таблица "role" =========
        await queryRunner.query(`
            CREATE TABLE "role" (
                "id" integer NOT NULL,
                "name" character varying(120) NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"),
                CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id")
            )
        `);

        // ========= Таблица "user" =========
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "firstName" character varying(255),
                "lastName" character varying(255),
                "patronymic" character varying(255),
                "email" character varying(120) NOT NULL,
                "password" character varying,
                "phoneNumber" character varying(20),
                "companyName" character varying(255),
                "telegram_chat_id" character varying(12),
                "idCardNumber" character varying(20),
                "idCardFrontImage" character varying(255),
                "idCardBackImage" character varying(255),
                "isVerified" boolean NOT NULL DEFAULT false,
                "verificationCode" character varying(6),
                "status" "user_status_enum" NOT NULL DEFAULT 'active',
                "profileImage" character varying(255),
                "address" text,
                "paymentMethod" character varying(50),
                "subscriptionType" character varying(50),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "telegram_chat_id_unique" UNIQUE ("telegram_chat_id"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);

        // ========= Таблица "bike" =========
        await queryRunner.query(`
            CREATE TABLE "bike" (
                "id" SERIAL NOT NULL,
                "name" character varying(255) NOT NULL,
                "model" character varying(255) NOT NULL,
                "availability_status" "availability_status_enum" NOT NULL DEFAULT 'available',
                "stock" integer NOT NULL DEFAULT 0,
                "max_speed" decimal(10, 2) NOT NULL,
                "range_per_charge" character varying(255) NOT NULL,
                "charge_time" character varying(255) NOT NULL,
                "max_load" decimal(10, 2) NOT NULL,
                "weight" decimal(10, 2) NOT NULL,
                "power" character varying(255) NOT NULL,
                "suspension" character varying(255) NOT NULL,
                "brakes" character varying(255) NOT NULL,
                "image_urls" text array NOT NULL DEFAULT '{}',
                "tags" text array NOT NULL DEFAULT '{}',
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_bike_id" PRIMARY KEY ("id")
            )
        `);

        // ========= Таблица "price_category" =========
        await queryRunner.query(`
            CREATE TABLE "price_category" (
                "id" SERIAL NOT NULL,
                "name" character varying(255) NOT NULL,
                "rental_duration" INT NOT NULL CHECK (rental_duration > 0),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_price_category_id" PRIMARY KEY ("id"),
                CONSTRAINT "UQ_price_category_name" UNIQUE ("name")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "currency" (
                "id" SERIAL NOT NULL,
                "code" character varying(10) NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_currency_code" UNIQUE ("code"),
                CONSTRAINT "PK_currency_id" PRIMARY KEY ("id")
            )
        `);

        // ========= Таблица "bike_price" (Связь: bike -- price_category) =========
        await queryRunner.query(`
            CREATE TABLE "bike_price" (
                "id" SERIAL NOT NULL,
                "bikeId" integer NOT NULL,
                "roleId" integer NOT NULL,
                "priceCategoryId" integer NOT NULL,
                "currency_id" integer NOT NULL,
                "price" decimal(10, 2) NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_bike_price_id" PRIMARY KEY ("id"),
                CONSTRAINT "FK_bike_price_bike" FOREIGN KEY ("bikeId") REFERENCES "bike"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_bike_price_category" FOREIGN KEY ("priceCategoryId") REFERENCES "price_category"("id") ON DELETE CASCADE
            )
        `);

        // ========= Таблица "rental" (Связь: user -- bike) =========
        await queryRunner.query(`
            CREATE TABLE "rental" (
                "id" SERIAL NOT NULL,
                "userId" integer NOT NULL,
                "roleId" integer NOT NULL,
                "priceCategoryId" integer NOT NULL,
                "currency_id" integer NOT NULL,
                "bikeId" integer NOT NULL,
                "start_date" TIMESTAMP NOT NULL,
                "end_date" TIMESTAMP NOT NULL,
                "total_price" decimal(10, 2) NOT NULL,
                "status" "rental_status_enum" NOT NULL DEFAULT 'on_payment',
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_rental_id" PRIMARY KEY ("id"),
                CONSTRAINT "FK_rental_user" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_rental_bike" FOREIGN KEY ("bikeId") REFERENCES "bike"("id") ON DELETE CASCADE
            )
        `);

        // ========= Таблица "payment" (Связь: user -- rental) =========
        await queryRunner.query(`
            CREATE TABLE "payment" (
                "id" SERIAL NOT NULL,
                "userId" integer NOT NULL,
                "rentalId" integer NOT NULL,
                "currency_id" integer NOT NULL,
                "amount" decimal(10, 2) NOT NULL,
                "payment_method" character varying(50) NOT NULL,
                "status" "payment_status_enum" NOT NULL DEFAULT 'pending',
                "transaction_date" TIMESTAMP NOT NULL DEFAULT now(),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_payment_id" PRIMARY KEY ("id"),
                CONSTRAINT "FK_payment_user" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_payment_rental" FOREIGN KEY ("rentalId") REFERENCES "rental"("id") ON DELETE CASCADE
            )
        `);

        // ========= Таблица "review" (Связь: user -- bike) =========
        await queryRunner.query(`
            CREATE TABLE "review" (
                "id" SERIAL NOT NULL,
                "userId" integer NOT NULL,
                "bikeId" integer NOT NULL,
                "rating" integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
                "comment" text,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_review_id" PRIMARY KEY ("id"),
                CONSTRAINT "FK_review_user" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_review_bike" FOREIGN KEY ("bikeId") REFERENCES "bike"("id") ON DELETE CASCADE
            )
        `);

        // ========= Таблица "maintenance" (Связь: bike) =========
        await queryRunner.query(`
            CREATE TABLE "maintenance" (
                "id" SERIAL NOT NULL,
                "bikeId" integer NOT NULL,
                "service_date" TIMESTAMP NOT NULL,
                "description" text,
                "status" "maintenance_status_enum" NOT NULL DEFAULT 'scheduled',
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_maintenance_id" PRIMARY KEY ("id"),
                CONSTRAINT "FK_maintenance_bike" FOREIGN KEY ("bikeId") REFERENCES "bike"("id") ON DELETE CASCADE
            )
        `);

        // ========= Таблица "user_roles" (Связь: многие ко многим) =========
        await queryRunner.query(`
            CREATE TABLE "user_roles" (
                "userId" integer NOT NULL,
                "roleId" integer NOT NULL,
                CONSTRAINT "PK_88481b0c4ed9ada47e9fdd67475" PRIMARY KEY ("userId", "roleId")
            )
        `);
        await queryRunner.query(`CREATE INDEX "IDX_472b25323af01488f1f66a06b6" ON "user_roles" ("userId")`);
        await queryRunner.query(`CREATE INDEX "IDX_86033897c009fcca8b6505d6be" ON "user_roles" ("roleId")`);
        await queryRunner.query(`
            ALTER TABLE "user_roles"
            ADD CONSTRAINT "FK_472b25323af01488f1f66a06b67"
            FOREIGN KEY ("userId") REFERENCES "user"("id")
            ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "user_roles"
            ADD CONSTRAINT "FK_86033897c009fcca8b6505d6be2"
            FOREIGN KEY ("roleId") REFERENCES "role"("id")
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);

        // ============  Добавляем дополнительные таблицы (accessories, vacancies, tariffs, translations) ============

        // ---------- 1) Таблица "accessories" ----------
        // 1) Создаём accessories
        await queryRunner.createTable(
            new Table({
                name: "accessories",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "bikeId",
                        type: "int",
                    },
                    { name: "name", type: "varchar" },
                    { name: "description", type: "text", isNullable: true },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "updatedAt",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                ],
            }),
            true
        );

// создаём внешний ключ на bike
        await queryRunner.createForeignKey(
            "accessories",
            new TableForeignKey({
                columnNames: ["bikeId"],
                referencedTableName: "bike",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
            })
        );

// 2) Теперь создаём accessories_price
        await queryRunner.query(`
    CREATE TABLE "accessories_price" (
        "id" SERIAL NOT NULL,
        "accessoriesId" integer NOT NULL,
        "roleId" integer NOT NULL,
        "priceCategoryId" integer NOT NULL,
        "currency_id" integer NOT NULL,
        "price" decimal(10, 2) NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_accessories_price_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_accessories_price" FOREIGN KEY ("accessoriesId") REFERENCES "accessories"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_accessories_price_category" FOREIGN KEY ("priceCategoryId") REFERENCES "price_category"("id") ON DELETE CASCADE
    )
`);

        // ---------- 2) Таблица "vacancies" ----------
        await queryRunner.createTable(
            new Table({
                name: "vacancies",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    { name: "title", type: "varchar" },
                    { name: "description", type: "text" },
                    {
                        name: "salary",
                        type: "decimal",
                        precision: 10,
                        scale: 2,
                        isNullable: true,
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "updatedAt",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                ],
            }),
            true
        );

        // ---------- 3) Таблица "tariffs" ----------
        await queryRunner.createTable(
            new Table({
                name: "tariffs",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "bikeId",
                        type: "int",
                    },
                    { name: "name", type: "varchar" },
                    { name: "price", type: "decimal", precision: 10, scale: 2 },
                    {
                        name: "duration",
                        type: "int",
                        comment: "Продолжительность тарифа в днях",
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "updatedAt",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                ],
            }),
            true
        );

        await queryRunner.createForeignKey(
            "tariffs",
            new TableForeignKey({
                columnNames: ["bikeId"],
                referencedTableName: "bike",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
            })
        );

        // ---------- 4) Таблица "translations" ----------
        await queryRunner.createTable(
            new Table({
                name: "translations",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    { name: "entityType", type: "varchar", length: "50" },
                    { name: "entityId", type: "int" },
                    { name: "field", type: "varchar", length: "50" },
                    { name: "language", type: "varchar", length: "5" },
                    { name: "translation", type: "text" },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "updatedAt",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                ],
                uniques: [
                    {
                        name: "UQ_translations_entity_field_lang",
                        columnNames: ["entityType", "entityId", "field", "language"],
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // =============== Сперва удаляем ДОБАВОЧНЫЕ таблицы и их внешние ключи ===============

        // ---------- accessories ----------
        const accessoriesTable = await queryRunner.getTable("accessories");
        if (accessoriesTable) {
            const accessoryFK = accessoriesTable.foreignKeys.find((fk) =>
                fk.columnNames.includes("bikeId")
            );
            if (accessoryFK) {
                await queryRunner.dropForeignKey("accessories", accessoryFK);
            }
            await queryRunner.dropTable("accessories");
        }

        // ---------- tariffs ----------
        const tariffsTable = await queryRunner.getTable("tariffs");
        if (tariffsTable) {
            const tariffFK = tariffsTable.foreignKeys.find((fk) =>
                fk.columnNames.includes("bikeId")
            );
            if (tariffFK) {
                await queryRunner.dropForeignKey("tariffs", tariffFK);
            }
            await queryRunner.dropTable("tariffs");
        }

        // ---------- vacancies ----------
        const vacanciesTable = await queryRunner.getTable("vacancies");
        if (vacanciesTable) {
            await queryRunner.dropTable("vacancies");
        }

        // ---------- translations ----------
        const translationsTable = await queryRunner.getTable("translations");
        if (translationsTable) {
            await queryRunner.dropTable("translations");
        }

        // =============== Далее удаляем ОСНОВНЫЕ таблицы ===============
        // Примерно так, как было в твоём исходном коде:

        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_86033897c009fcca8b6505d6be2"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_472b25323af01488f1f66a06b67"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_86033897c009fcca8b6505d6be"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_472b25323af01488f1f66a06b6"`);
        await queryRunner.query(`DROP TABLE "user_roles"`);

        await queryRunner.query(`DROP TABLE IF EXISTS "maintenance"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "review"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "payment"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "rental"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "bike_price"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "price_category"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "bike"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "user"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "role"`);

        // =============== Удаляем ENUM типы ===============
        await queryRunner.query(`DROP TYPE "user_status_enum"`);
        await queryRunner.query(`DROP TYPE "user_payment_status_enum"`);
        await queryRunner.query(`DROP TYPE "availability_status_enum"`);
        await queryRunner.query(`DROP TYPE "rental_status_enum"`);
        await queryRunner.query(`DROP TYPE "payment_status_enum"`);
        await queryRunner.query(`DROP TYPE "maintenance_status_enum"`);
    }
}