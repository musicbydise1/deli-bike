import { Categories } from 'src/database/entities/category.entity';
export declare class ComputerDetails {
    category: Categories;
    capacity: number;
    capacityUnit: 'GB' | 'TB';
    capacityType: 'SSD' | 'HD';
    brand: string;
    series: string;
}
