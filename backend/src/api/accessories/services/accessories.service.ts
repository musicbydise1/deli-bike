import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Accessory } from '../entities/accessory.entity';
import { CreateAccessoryDto, UpdateAccessoryDto } from '../dto/accessory.dto';
import { Bike } from '../../bike/entities/bike.entity';
import { AccessoriesPrice } from '../entities/accessories_price.entity';
import { PriceCategory } from '../../price-category/entities/price-category.entity';
import { Role } from '../../../database/entities/role.entity';
import { Currency } from '../../currency/entities/currency.entity';
import { TranslationsService } from '../../translations/service/translations.service'; // <-- Инжектируем

@Injectable()
export class AccessoriesService {
    constructor(
        @InjectRepository(Accessory)
        private readonly accessoryRepository: Repository<Accessory>,

        private readonly translationsService: TranslationsService, // <-- добавили
    ) {}

    async findAll(): Promise<Accessory[]> {
        // 1. Получаем аксессуары с ценами и т.д.
        const accessories = await this.accessoryRepository.find({
            relations: ['bike', 'prices', 'prices.priceCategory', 'prices.role', 'prices.currency'],
        });

        // 2. Для каждого аксессуара подтягиваем переводы (entityType='accessory', entityId=accessory.id)
        for (const accessory of accessories) {
            const translations = await this.translationsService.findAllForEntity('accessory', accessory.id);
            accessory['translations'] = translations; // дописываем «виртуальное» поле
        }

        return accessories;
    }

    async findById(id: number): Promise<Accessory> {
        // 1. Получаем аксессуар
        const accessory = await this.accessoryRepository.findOne({
            where: { id },
            relations: ['bike', 'prices', 'prices.priceCategory', 'prices.role', 'prices.currency'],
        });
        if (!accessory) {
            throw new NotFoundException(`Accessory with ID ${id} not found`);
        }

        // 2. Подгружаем переводы
        const translations = await this.translationsService.findAllForEntity('accessory', accessory.id);
        accessory['translations'] = translations;

        return accessory;
    }

    /**
     * Создаёт аксессуар(ы) для одного или нескольких bikeId.
     * Каждый аксессуар может содержать массив цен (prices) и переводы (translations).
     */
    async createAccessory(dto: CreateAccessoryDto): Promise<Accessory[]> {
        const accessories: Accessory[] = [];

        for (const bikeId of dto.bikeId) {
            // Создаём аксессуар
            const accessory = new Accessory();
            accessory.name = dto.name;
            accessory.description = dto.description;
            accessory.bikeId = bikeId;
            accessory.bike = { id: bikeId } as Bike;

            // Преобразуем prices из DTO в объекты AccessoriesPrice
            if (dto.prices && dto.prices.length > 0) {
                accessory.prices = dto.prices.map((priceDto) => {
                    const accessoryPrice = new AccessoriesPrice();
                    accessoryPrice.priceCategory = { id: priceDto.categoryId } as PriceCategory;
                    accessoryPrice.role = { id: priceDto.roleId } as Role;
                    accessoryPrice.currency = { id: priceDto.currencyId } as Currency;
                    accessoryPrice.price = priceDto.price;
                    return accessoryPrice;
                });
            } else {
                accessory.prices = [];
            }

            // Сохраняем аксессуар
            const savedAccessory = await this.accessoryRepository.save(accessory);

            // Если есть переводы, создаём их (entityType='accessory', entityId=savedAccessory.id)
            if (dto.translations && dto.translations.length > 0) {
                for (const t of dto.translations) {
                    await this.translationsService.createOrUpdateTranslation({
                        entityType: 'accessory',
                        entityId: savedAccessory.id,
                        field: t.field,
                        language: t.language,
                        translation: t.translation,
                    });
                }
            }

            accessories.push(savedAccessory);
        }

        return accessories;
    }

    async updateAccessory(id: number, dto: UpdateAccessoryDto): Promise<Accessory> {
        const accessory = await this.findById(id);
        Object.assign(accessory, dto);
        return this.accessoryRepository.save(accessory);
    }

    async deleteAccessory(id: number): Promise<void> {
        await this.accessoryRepository.delete(id);
    }
}