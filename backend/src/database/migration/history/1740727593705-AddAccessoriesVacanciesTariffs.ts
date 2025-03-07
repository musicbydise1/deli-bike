import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class AddAccessoriesVacanciesTariffs1660000000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Создание таблицы accessories с привязкой к таблице bikes
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
            }),
            true
        );

        // Добавляем внешний ключ для bikeId в таблице accessories
        await queryRunner.createForeignKey(
            "accessories",
            new TableForeignKey({
                columnNames: ["bikeId"],
                referencedTableName: "bike",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
            })
        );

        // Создание таблицы vacancies (отдельная таблица)
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

        // Создание таблицы tariffs с привязкой к таблице bikes
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

        // Добавляем внешний ключ для bikeId в таблице tariffs
        await queryRunner.createForeignKey(
            "tariffs",
            new TableForeignKey({
                columnNames: ["bikeId"],
                referencedTableName: "bike",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Удаляем внешние ключи перед удалением таблиц

        // Для таблицы tariffs
        const tariffsTable = await queryRunner.getTable("tariffs");
        if (tariffsTable) {
            const tariffForeignKey = tariffsTable.foreignKeys.find((fk) =>
                fk.columnNames.includes("bikeId")
            );
            if (tariffForeignKey) {
                await queryRunner.dropForeignKey("tariffs", tariffForeignKey);
            }
        }

        // Для таблицы accessories
        const accessoriesTable = await queryRunner.getTable("accessories");
        if (accessoriesTable) {
            const accessoryForeignKey = accessoriesTable.foreignKeys.find((fk) =>
                fk.columnNames.includes("bikeId")
            );
            if (accessoryForeignKey) {
                await queryRunner.dropForeignKey("accessories", accessoryForeignKey);
            }
        }

        // Удаляем таблицы в обратном порядке
        await queryRunner.dropTable("tariffs");
        await queryRunner.dropTable("vacancies");
        await queryRunner.dropTable("accessories");
    }
}