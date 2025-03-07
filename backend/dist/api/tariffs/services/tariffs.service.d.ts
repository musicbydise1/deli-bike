import { Repository } from 'typeorm';
import { Tariff } from '../entities/tariff.entity';
import { CreateTariffDto, UpdateTariffDto } from '../dto/tariff.dto';
export declare class TariffsService {
    private tariffRepository;
    constructor(tariffRepository: Repository<Tariff>);
    findAll(): Promise<Tariff[]>;
    findById(id: number): Promise<Tariff>;
    createTariff(dto: CreateTariffDto): Promise<Tariff>;
    updateTariff(id: number, dto: UpdateTariffDto): Promise<Tariff>;
    deleteTariff(id: number): Promise<void>;
}
