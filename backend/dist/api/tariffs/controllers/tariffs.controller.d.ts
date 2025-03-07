import { TariffsService } from '../services/tariffs.service';
import { Tariff } from '../entities/tariff.entity';
import { CreateTariffDto, UpdateTariffDto } from '../dto/tariff.dto';
export declare class TariffsController {
    private readonly tariffsService;
    constructor(tariffsService: TariffsService);
    findAll(): Promise<Tariff[]>;
    findById(id: number): Promise<Tariff>;
    create(dto: CreateTariffDto): Promise<Tariff>;
    update(id: number, dto: UpdateTariffDto): Promise<Tariff>;
    delete(id: number): Promise<void>;
}
