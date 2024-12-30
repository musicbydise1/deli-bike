"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Init1683977309684 = void 0;
class Init1683977309684 {
    constructor() {
        this.name = 'Init1683977309684';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "user_status_enum" AS ENUM('active', 'suspended', 'deleted')`);
        await queryRunner.query(`CREATE TYPE "user_payment_status_enum" AS ENUM('pending', 'completed', 'failed')`);
        await queryRunner.query(`CREATE TYPE "availability_status_enum" AS ENUM('available', 'rented', 'maintenance')`);
        await queryRunner.query(`CREATE TYPE "rental_status_enum" AS ENUM('active', 'completed', 'cancelled')`);
        await queryRunner.query(`CREATE TYPE "payment_status_enum" AS ENUM('pending', 'completed', 'failed')`);
        await queryRunner.query(`CREATE TYPE "maintenance_status_enum" AS ENUM('scheduled', 'completed')`);
        await queryRunner.query(`CREATE TABLE "role" ("id" integer NOT NULL, "name" character varying(120) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" (
        "id" SERIAL NOT NULL, 
        "firstName" character varying(255), 
        "lastName" character varying(255), 
        "patronymic" character varying(255), 
        "email" character varying(120) NOT NULL, 
        "password" character varying NOT NULL, 
        "phoneNumber" character varying(20), 
        "companyName" character varying(255), 
        "iin" character varying(12) UNIQUE, 
        "idCardNumber" character varying(20), 
        "idCardFrontImage" character varying(255), 
        "idCardBackImage" character varying(255), 
        "isVerified" boolean NOT NULL DEFAULT false, 
        "verificationCode" character varying(6), 
        "mfaEnabled" boolean NOT NULL DEFAULT false, 
        "mfaSecret" character varying(255), 
        "status" "user_status_enum" NOT NULL DEFAULT 'active', 
        "profileImage" character varying(255), 
        "address" text, 
        "paymentMethod" character varying(50), 
        "paymentStatus" "user_payment_status_enum", 
        "rentalHistory" json, 
        "walletBalance" decimal(10, 2) NOT NULL DEFAULT 0, 
        "subscriptionType" character varying(50), 
        "preferredCurrency" character varying(10) NOT NULL DEFAULT 'USD', 
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
        CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), 
        CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
    )`);
        await queryRunner.query(`CREATE TABLE "bike" (
            "id" SERIAL NOT NULL,
            "name" character varying(255) NOT NULL,
            "model" character varying(255) NOT NULL,
            "description" text,
            "price_per_hour" decimal(10, 2) NOT NULL,
            "price_per_day" decimal(10, 2) NOT NULL,
            "availability_status" "availability_status_enum" NOT NULL DEFAULT 'available',
            "image_urls" text array NOT NULL DEFAULT '{}',
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
            "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
            CONSTRAINT "PK_bike_id" PRIMARY KEY ("id")
        )`);
        await queryRunner.query(`CREATE TABLE "rental" (
            "id" SERIAL NOT NULL,
            "userId" integer NOT NULL,
            "bikeId" integer NOT NULL,
            "start_date" TIMESTAMP NOT NULL,
            "end_date" TIMESTAMP NOT NULL,
            "total_price" decimal(10, 2) NOT NULL,
            "status" "rental_status_enum" NOT NULL DEFAULT 'active',
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
            "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
            CONSTRAINT "PK_rental_id" PRIMARY KEY ("id"),
            CONSTRAINT "FK_rental_user" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE,
            CONSTRAINT "FK_rental_bike" FOREIGN KEY ("bikeId") REFERENCES "bike"("id") ON DELETE CASCADE
        )`);
        await queryRunner.query(`CREATE TABLE "payment" (
            "id" SERIAL NOT NULL,
            "userId" integer NOT NULL,
            "rentalId" integer NOT NULL,
            "amount" decimal(10, 2) NOT NULL,
            "payment_method" character varying(50) NOT NULL,
            "status" "payment_status_enum" NOT NULL DEFAULT 'pending',
            "transaction_date" TIMESTAMP NOT NULL DEFAULT now(),
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
            "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
            CONSTRAINT "PK_payment_id" PRIMARY KEY ("id"),
            CONSTRAINT "FK_payment_user" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE,
            CONSTRAINT "FK_payment_rental" FOREIGN KEY ("rentalId") REFERENCES "rental"("id") ON DELETE CASCADE
        )`);
        await queryRunner.query(`CREATE TABLE "review" (
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
        )`);
        await queryRunner.query(`CREATE TABLE "maintenance" (
            "id" SERIAL NOT NULL,
            "bikeId" integer NOT NULL,
            "service_date" TIMESTAMP NOT NULL,
            "description" text,
            "status" "maintenance_status_enum" NOT NULL DEFAULT 'scheduled',
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
            "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
            CONSTRAINT "PK_maintenance_id" PRIMARY KEY ("id"),
            CONSTRAINT "FK_maintenance_bike" FOREIGN KEY ("bikeId") REFERENCES "bike"("id") ON DELETE CASCADE
        )`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "code" character varying, "title" character varying, "variationType" character varying, "description" text, "about" text array NOT NULL DEFAULT '{}', "details" jsonb, "isActive" boolean NOT NULL DEFAULT false, "merchantId" integer, "categoryId" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_99c39b067cfa73c783f0fc49a6" ON "product" ("code") `);
        await queryRunner.query(`CREATE TABLE "category" ("id" integer NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "country" ("code" character varying(7) NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8ff4c23dc9a3f3856555bd86186" PRIMARY KEY ("code"))`);
        await queryRunner.query(`CREATE TABLE "currency" ("code" character varying(7) NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_723472e41cae44beb0763f4039c" PRIMARY KEY ("code"))`);
        await queryRunner.query(`CREATE TABLE "color" ("name" character varying(30) NOT NULL, "hexCode" character varying(10) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_229c1a96f14d7187fccf3684ecc" PRIMARY KEY ("name"))`);
        await queryRunner.query(`CREATE TABLE "size" ("code" character varying(30) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4dd6860deef208c5fc96c6d311f" PRIMARY KEY ("code"))`);
        await queryRunner.query(`CREATE TABLE "product_variation" ("id" SERIAL NOT NULL, "productId" integer NOT NULL, "sizeCode" character varying(7) NOT NULL, "colorName" character varying(30) NOT NULL, "imageUrls" text array NOT NULL DEFAULT '{}', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bfae10232dcbc2c77fb37d0ebf5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "inventory" ("id" SERIAL NOT NULL, "productVariationId" integer NOT NULL, "countryCode" character varying(7) NOT NULL, "quantity" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_82aa5da437c5bbfb80703b08309" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_variation_price" ("id" SERIAL NOT NULL, "productVariationId" integer NOT NULL, "countryCode" character varying(7) NOT NULL, "currencyCode" character varying(7) NOT NULL, "price" double precision NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3b3ac8ce948a3f88a0c8c1fb4f6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_roles" ("userId" integer NOT NULL, "roleId" integer NOT NULL, CONSTRAINT "PK_88481b0c4ed9ada47e9fdd67475" PRIMARY KEY ("userId", "roleId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_472b25323af01488f1f66a06b6" ON "user_roles" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_86033897c009fcca8b6505d6be" ON "user_roles" ("roleId") `);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_62fcc319202f6ec1f6819e1d5f5" FOREIGN KEY ("merchantId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_variation" ADD CONSTRAINT "FK_9eb6ebb27c4efb410d7a89670b5" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_variation" ADD CONSTRAINT "FK_320442ee533dc6dbcaf28f4c58e" FOREIGN KEY ("sizeCode") REFERENCES "size"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_variation" ADD CONSTRAINT "FK_78161b50cf9e0db3b14962b4dd9" FOREIGN KEY ("colorName") REFERENCES "color"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD CONSTRAINT "FK_61f77b98a38ff29f0fa5fb9d679" FOREIGN KEY ("productVariationId") REFERENCES "product_variation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD CONSTRAINT "FK_8c027794f89b1607ccbba284ec5" FOREIGN KEY ("countryCode") REFERENCES "country"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_variation_price" ADD CONSTRAINT "FK_b519d6fa0ef2e0e8b73ac473edb" FOREIGN KEY ("productVariationId") REFERENCES "product_variation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_variation_price" ADD CONSTRAINT "FK_8a44e4e97706b95305450b92716" FOREIGN KEY ("countryCode") REFERENCES "country"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_variation_price" ADD CONSTRAINT "FK_ecdc419b741a8e31986e4aed94b" FOREIGN KEY ("currencyCode") REFERENCES "currency"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_472b25323af01488f1f66a06b67" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_86033897c009fcca8b6505d6be2" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_86033897c009fcca8b6505d6be2"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_472b25323af01488f1f66a06b67"`);
        await queryRunner.query(`ALTER TABLE "product_variation_price" DROP CONSTRAINT "FK_ecdc419b741a8e31986e4aed94b"`);
        await queryRunner.query(`ALTER TABLE "product_variation_price" DROP CONSTRAINT "FK_8a44e4e97706b95305450b92716"`);
        await queryRunner.query(`ALTER TABLE "product_variation_price" DROP CONSTRAINT "FK_b519d6fa0ef2e0e8b73ac473edb"`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "FK_8c027794f89b1607ccbba284ec5"`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "FK_61f77b98a38ff29f0fa5fb9d679"`);
        await queryRunner.query(`ALTER TABLE "product_variation" DROP CONSTRAINT "FK_78161b50cf9e0db3b14962b4dd9"`);
        await queryRunner.query(`ALTER TABLE "product_variation" DROP CONSTRAINT "FK_320442ee533dc6dbcaf28f4c58e"`);
        await queryRunner.query(`ALTER TABLE "product_variation" DROP CONSTRAINT "FK_9eb6ebb27c4efb410d7a89670b5"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_62fcc319202f6ec1f6819e1d5f5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_86033897c009fcca8b6505d6be"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_472b25323af01488f1f66a06b6"`);
        await queryRunner.query(`DROP TABLE "user_roles"`);
        await queryRunner.query(`DROP TABLE "product_variation_price"`);
        await queryRunner.query(`DROP TABLE "inventory"`);
        await queryRunner.query(`DROP TABLE "product_variation"`);
        await queryRunner.query(`DROP TABLE "size"`);
        await queryRunner.query(`DROP TABLE "color"`);
        await queryRunner.query(`DROP TABLE "currency"`);
        await queryRunner.query(`DROP TABLE "country"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_99c39b067cfa73c783f0fc49a6"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TYPE "user_status_enum"`);
        await queryRunner.query(`DROP TYPE "user_payment_status_enum"`);
    }
}
exports.Init1683977309684 = Init1683977309684;
//# sourceMappingURL=1683977309685-init.js.map