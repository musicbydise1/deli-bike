import { AdminSeeder } from './seeders/admin.seeder';
import { CategorySeeder } from './seeders/category.seeder';
import { ColorSeeder } from './seeders/color.seeder';
import { CountrySeeder } from './seeders/country.seeder';
import { CurrencySeeder } from './seeders/currency.seeder';
import { RolesSeeder } from './seeders/role.seeder';
import { SizeSeeder } from './seeders/size.seeder';
export declare class SeedService {
    private readonly seeders;
    private readonly logger;
    constructor(rolesSeeder: RolesSeeder, adminSeeder: AdminSeeder, categoriesSeeder: CategorySeeder, sizesSeeder: SizeSeeder, colorsSeeder: ColorSeeder, countrySeeder: CountrySeeder, currencySeeder: CurrencySeeder);
    seed(): Promise<void>;
}
