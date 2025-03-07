"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddAccessoriesVacanciesTariffs1660000000000 = void 0;
const typeorm_1 = require("typeorm");
class AddAccessoriesVacanciesTariffs1660000000000 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
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
                { name: "price", type: "decimal", precision: 10, scale: 2 },
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
        }), true);
        await queryRunner.createForeignKey("accessories", new typeorm_1.TableForeignKey({
            columnNames: ["bikeId"],
            referencedTableName: "bike",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
        }));
        await queryRunner.createTable(new typeorm_1.Table({
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
        }), true);
        await queryRunner.createTable(new typeorm_1.Table({
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
        }), true);
        await queryRunner.createForeignKey("tariffs", new typeorm_1.TableForeignKey({
            columnNames: ["bikeId"],
            referencedTableName: "bike",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
        }));
    }
    async down(queryRunner) {
        const tariffsTable = await queryRunner.getTable("tariffs");
        if (tariffsTable) {
            const tariffForeignKey = tariffsTable.foreignKeys.find((fk) => fk.columnNames.includes("bikeId"));
            if (tariffForeignKey) {
                await queryRunner.dropForeignKey("tariffs", tariffForeignKey);
            }
        }
        const accessoriesTable = await queryRunner.getTable("accessories");
        if (accessoriesTable) {
            const accessoryForeignKey = accessoriesTable.foreignKeys.find((fk) => fk.columnNames.includes("bikeId"));
            if (accessoryForeignKey) {
                await queryRunner.dropForeignKey("accessories", accessoryForeignKey);
            }
        }
        await queryRunner.dropTable("tariffs");
        await queryRunner.dropTable("vacancies");
        await queryRunner.dropTable("accessories");
    }
}
exports.AddAccessoriesVacanciesTariffs1660000000000 = AddAccessoriesVacanciesTariffs1660000000000;
//# sourceMappingURL=1740727593705-AddAccessoriesVacanciesTariffs.js.map