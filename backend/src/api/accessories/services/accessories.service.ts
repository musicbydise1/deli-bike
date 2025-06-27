import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Accessory } from "../entities/accessory.entity";
import {
  AccessoriesPriceDto,
  CreateAccessoryDto,
  CreateAccessoryTranslationDto,
  UpdateAccessoryDto,
} from "../dto/accessory.dto";
import { Bike } from "../../modules/bikes/entities/bike.entity";
import { AccessoriesPrice } from "../entities/accessories_price.entity";
import { PriceCategory } from "../../../modules/pricing/price-categories/entities/price-category.entity";
import { Role } from "../../../database/entities/role.entity";
import { Currency } from "../../../modules/pricing/currency/entities/currency.entity";
import { TranslationsService } from "../../../modules/translations/service/translations.service";

@Injectable()
export class AccessoriesService {
  constructor(
    @InjectRepository(Accessory)
    private readonly accessoryRepository: Repository<Accessory>,

    @InjectRepository(AccessoriesPrice)
    private readonly accessoriesPriceRepo: Repository<AccessoriesPrice>,

    private readonly translationsService: TranslationsService
  ) {}

  async findAll(): Promise<Accessory[]> {
    const accessories = await this.accessoryRepository.find({
      relations: [
        "bike",
        "prices",
        "prices.priceCategory",
        "prices.role",
        "prices.currency",
      ],
    });

    for (const accessory of accessories) {
      const translations = await this.translationsService.findAllForEntity(
        "accessory",
        accessory.id
      );
      (accessory as any).translations = translations;
    }

    return accessories;
  }

  async findById(id: number): Promise<Accessory> {
    const accessory = await this.accessoryRepository.findOne({
      where: { id },
      relations: [
        "bike",
        "prices",
        "prices.priceCategory",
        "prices.role",
        "prices.currency",
      ],
    });
    if (!accessory) {
      throw new NotFoundException(`Accessory with ID ${id} not found`);
    }

    const translations = await this.translationsService.findAllForEntity(
      "accessory",
      accessory.id
    );
    (accessory as any).translations = translations;

    return accessory;
  }

  async createAccessory(dto: CreateAccessoryDto): Promise<Accessory[]> {
    const created: Accessory[] = [];

    for (const bikeId of dto.bikeId) {
      const accessory = new Accessory();
      accessory.name = dto.name;
      accessory.description = dto.description;
      accessory.bike = { id: bikeId } as Bike;
      accessory.bikeId = bikeId;

      // prices
      if (dto.prices?.length) {
        accessory.prices = dto.prices.map((prDto) => {
          const ap = new AccessoriesPrice();
          ap.priceCategory = { id: prDto.categoryId } as PriceCategory;
          ap.role = { id: prDto.roleId } as Role;
          ap.currency = { id: prDto.currencyId } as Currency;
          ap.price = prDto.price;
          return ap;
        });
      } else {
        accessory.prices = [];
      }

      const saved = await this.accessoryRepository.save(accessory);

      if (dto.translations?.length) {
        for (const t of dto.translations) {
          await this.translationsService.createOrUpdateTranslation({
            entityType: "accessory",
            entityId: saved.id,
            field: t.field,
            language: t.language,
            translation: t.translation,
          });
        }
      }

      created.push(saved);
    }

    return created;
  }

  async updateAccessory(
    id: number,
    dto: UpdateAccessoryDto & {
      prices?: AccessoriesPriceDto[];
      translations?: CreateAccessoryTranslationDto[];
    }
  ): Promise<Accessory> {
    // 1) Загрузить существующую сущность (с bikeId внутри)
    const accessory = await this.findById(id);

    // 2) Мутируем только нужные поля
    if (dto.name !== undefined) {
      accessory.name = dto.name;
    }
    if (dto.description !== undefined) {
      accessory.description = dto.description;
    }

    // 3) Обновляем цены (примерно как раньше)
    if (dto.prices) {
      // … ваш код для удаления/обновления/добавления prices …
    }

    // 4) Обновляем переводы
    if (dto.translations) {
      for (const t of dto.translations) {
        await this.translationsService.createOrUpdateTranslation({
          entityType: "accessory",
          entityId: id,
          field: t.field,
          language: t.language,
          translation: t.translation,
        });
      }
    }

    // 5) Сохраняем всю сущность вместе с тем же bikeId
    return this.accessoryRepository.save(accessory);
  }

  async deleteAccessory(id: number): Promise<void> {
    await this.accessoryRepository.delete(id);
  }
}
