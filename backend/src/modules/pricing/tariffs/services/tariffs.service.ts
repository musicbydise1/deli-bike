import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Tariff } from "../entities/tariff.entity";
import { CreateTariffDto, UpdateTariffDto } from "../dto/tariff.dto";

@Injectable()
export class TariffsService {
  constructor(
    @InjectRepository(Tariff)
    private tariffRepository: Repository<Tariff>
  ) {}

  async findAll(): Promise<Tariff[]> {
    return this.tariffRepository.find();
  }

  async findById(id: number): Promise<Tariff> {
    const tariff = await this.tariffRepository.findOne({ where: { id } });
    if (!tariff) {
      throw new NotFoundException(`Tariff with ID ${id} not found`);
    }
    return tariff;
  }

  async createTariff(dto: CreateTariffDto): Promise<Tariff> {
    const tariff = this.tariffRepository.create(dto);
    return this.tariffRepository.save(tariff);
  }

  async updateTariff(id: number, dto: UpdateTariffDto): Promise<Tariff> {
    const tariff = await this.findById(id);
    Object.assign(tariff, dto);
    return this.tariffRepository.save(tariff);
  }

  async deleteTariff(id: number): Promise<void> {
    await this.tariffRepository.delete(id);
  }
}
