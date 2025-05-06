import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bike } from '../entities/bike.entity';
import { BikePrice } from '../entities/bike_price.entity';
import {BikePriceDto, CreateBikeDto, CreateBikeTranslationDto} from '../dto/create-bike.dto';
import {TranslationsService} from "../../translations/service/translations.service";
import {Translation} from "../../translations/entity/translations.entity";

@Injectable()
export class BikeService {
    constructor(
        @InjectRepository(Bike)
        private bikeRepository: Repository<Bike>,
        @InjectRepository(BikePrice)
        private bikePriceRepository: Repository<BikePrice>,

        @InjectRepository(Translation)
        private translationRepository: Repository<Translation>, // <-- добавляем

        private readonly translationsService: TranslationsService,
    ) {}

    async findAll(): Promise<Bike[]> {
        // Получаем все доступные байки с нужными связями
        const bikes = await this.bikeRepository.find({
            where: { availability_status: 'available' },
            relations: [
                'prices',
                'prices.priceCategory',
                'prices.role',
                'prices.currency',
                'accessories',
                'accessories.prices',
                'accessories.prices.priceCategory',
                'accessories.prices.role',
                'accessories.prices.currency',
            ],
        });

        if (!bikes || bikes.length === 0) {
            return [];
        }

        // Загружаем переводы параллельно для каждого байка и его связанных сущностей
        await Promise.all(bikes.map(async bike => {
            // Добавляем переводы для байка
            (bike as any).translations = await this.translationsService.findAllForEntity('bike', bike.id);

            // Для каждой цены загружаем переводы для priceCategory
            if (bike.prices && bike.prices.length > 0) {
                await Promise.all(bike.prices.map(async price => {
                    if (price.priceCategory) {
                        (price.priceCategory as any).translations = await this.translationsService.findAllForEntity('priceCategory', price.priceCategory.id);
                    }
                }));
            }

            // Для каждого аксессуара загружаем переводы
            if (bike.accessories && bike.accessories.length > 0) {
                await Promise.all(bike.accessories.map(async accessory => {
                    (accessory as any).translations = await this.translationsService.findAllForEntity('accessory', accessory.id);
                }));
            }
        }));

        return bikes;
    }

    async findOneById(id: number): Promise<Bike> {
        // Получаем байк по id с нужными связями
        const bike = await this.bikeRepository.findOne({
            where: { id },
            relations: [
                'prices',
                'prices.priceCategory',
                'prices.role',
                'prices.currency',
                'accessories',
                'accessories.prices',
                'accessories.prices.priceCategory',
                'accessories.prices.role',
                'accessories.prices.currency',
            ],
        });

        if (!bike) {
            throw new NotFoundException(`Bike with ID ${id} not found`);
        }

        // Загружаем переводы для самого байка
        (bike as any).translations = await this.translationsService.findAllForEntity('bike', bike.id);

        // Для каждой цены добавляем переводы для priceCategory
        if (bike.prices && bike.prices.length > 0) {
            await Promise.all(bike.prices.map(async price => {
                if (price.priceCategory) {
                    (price.priceCategory as any).translations = await this.translationsService.findAllForEntity('price_category', price.priceCategory.id);
                }
            }));
        }

        // Для каждого аксессуара загружаем переводы
        if (bike.accessories && bike.accessories.length > 0) {
            await Promise.all(bike.accessories.map(async accessory => {
                (accessory as any).translations = await this.translationsService.findAllForEntity('accessory', accessory.id);
            }));
        }

        return bike;
    }

    async createBike(bikeData: CreateBikeDto): Promise<Bike> {
        console.log('BikeService.createBike, final bikeData:', JSON.stringify(bikeData, null, 2));

        const { prices, translations, ...bikeDetails } = bikeData;

        // 1. Сохраняем байк
        const bike = this.bikeRepository.create(bikeDetails);
        const savedBike = await this.bikeRepository.save(bike);

        // 2. Логируем, что у нас в prices
        console.log('BikeService, prices:', prices);

        // 3. Сохраняем цены (BikePrice)
        if (prices && prices.length > 0) {
            const bikePrices = prices.map((priceDto) => {
                console.log('Creating BikePrice for:', priceDto);
                return this.bikePriceRepository.create({
                    bike: savedBike,
                    priceCategory: { id: priceDto.categoryId },
                    role: { id: priceDto.roleId },
                    currency: { id: priceDto.currencyId },
                    price: priceDto.price,
                });
            });
            await this.bikePriceRepository.save(bikePrices);
        }

        // 4. Если есть переводы - создаём/обновляем их
        console.log('BikeService, translations:', translations);
        if (translations && translations.length > 0) {
            for (const t of translations) {
                console.log('Creating translation for:', t);
                await this.translationsService.createOrUpdateTranslation({
                    entityType: 'bike',
                    entityId: savedBike.id,
                    field: t.field,
                    language: t.language,
                    translation: t.translation,
                });
            }
        }

        return savedBike;
    }

    async updateBike(
        id: number,
        bikeData: Partial<CreateBikeDto & {
            prices?: BikePriceDto[];
            translations?: CreateBikeTranslationDto[];
            imageUrls?: string[];
        }>,
    ): Promise<Bike> {
        // 1) Извлекаем prices, translations и imageUrls, всё остальное пойдёт в bikeDetails
        const { prices, translations, imageUrls, ...bikeDetails } = bikeData;

        // 2) Обновляем основные поля велосипеда
        await this.bikeRepository.update(id, bikeDetails);

        // 3) Обновляем imageUrls (если пришли новые URL-ы картинок)
        if (imageUrls && imageUrls.length > 0) {
            // Предположим, в вашей сущности Bike есть колонка imageUrls: string[]
            await this.bikeRepository.update(id, { imageUrls });
        }

        // 4) Работаем с ценами (ваш существующий код)
        if (prices) {
            const currentPrices = await this.bikePriceRepository.find({
                where: { bike: { id } },
                relations: ['priceCategory'],
            });

            const newPriceIds = prices.map(p => p.categoryId);
            const toDelete = currentPrices.filter(cp => !newPriceIds.includes(cp.priceCategory.id));
            if (toDelete.length) {
                await this.bikePriceRepository.delete(toDelete.map(p => p.id));
            }

            for (const p of prices) {
                const exist = currentPrices.find(cp => cp.priceCategory.id === p.categoryId);
                if (exist) {
                    await this.bikePriceRepository.update(exist.id, {
                        price: p.price,
                        role: { id: p.roleId },
                        currency: { id: p.currencyId },
                    });
                } else {
                    await this.bikePriceRepository.save(
                        this.bikePriceRepository.create({
                            bike: { id },
                            priceCategory: { id: p.categoryId },
                            price: p.price,
                            role: { id: p.roleId },
                            currency: { id: p.currencyId },
                        })
                    );
                }
            }
        }

        // 5) Работаем с переводами
        if (translations && translations.length > 0) {
            for (const t of translations) {
                await this.translationsService.createOrUpdateTranslation({
                    entityType: 'bike',
                    entityId: id,
                    field: t.field,
                    language: t.language,
                    translation: t.translation,
                });
            }
        }

        // 6) Вернуть полностью «свежий» объект
        return this.bikeRepository.findOneOrFail({
            where: { id },
            relations: [
                'prices',
                'prices.priceCategory',
                'prices.role',
                'prices.currency',
                'accessories',
                'accessories.prices',
                'accessories.prices.priceCategory',
                'accessories.prices.role',
                'accessories.prices.currency',
            ],
        });
    }


    async deleteBike(id: number): Promise<void> {
        // Удаление байка автоматически удаляет связанные цены (ON DELETE CASCADE)
        await this.bikeRepository.delete(id);
    }
}
