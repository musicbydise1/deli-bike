import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bike } from '../entities/bike.entity';
import { BikePrice } from '../entities/bike_price.entity';
import { CreateBikeDto } from '../dto/create-bike.dto';

@Injectable()
export class BikeService {
    constructor(
        @InjectRepository(Bike)
        private bikeRepository: Repository<Bike>,
        @InjectRepository(BikePrice)
        private bikePriceRepository: Repository<BikePrice>,
    ) {}

    async findAll(): Promise<Bike[]> {
        return this.bikeRepository.find({
            where: { availability_status: 'available' }, // Убедитесь, что используется правильное имя свойства
            relations: ['prices', 'prices.priceCategory', 'accessories'], // Загружаем связанные цены и категории
        });
    }

    async findOneById(id: number): Promise<Bike> {
        return this.bikeRepository.findOne({
            where: { id },
            relations: ['prices', 'prices.priceCategory', 'accessories'], // Загружаем связанные цены и категории
        });
    }

    async createBike(bikeData: CreateBikeDto): Promise<Bike> {
        console.log('BikeService.createBike, bikeData:', bikeData);
        const { prices, ...bikeDetails } = bikeData;
        console.log('Получены цены:', prices);

        // Создаем велосипед
        const bike = this.bikeRepository.create(bikeDetails);
        const savedBike = await this.bikeRepository.save(bike);


        console.log('BikeService.createBike, prices:', bikeData.prices);

        // Если цены переданы, создаем связанные записи цен
        if (prices && prices.length > 0) {
            const bikePrices = prices.map((price) => {
                console.log('Создаем цену для:', price);
                return this.bikePriceRepository.create({
                    bike: savedBike, // Связываем с сохраненным велосипедом
                    priceCategory: { id: price.categoryId }, // Указываем категорию через ID
                    price: price.price,
                });
            });

            await this.bikePriceRepository.save(bikePrices);
        }

        return savedBike;
    }

    async updateBike(
        id: number,
        bikeData: Partial<CreateBikeDto & { prices?: { categoryId: number; price: number }[] }>,
    ): Promise<Bike> {
        const { prices, ...bikeDetails } = bikeData;

        // Обновляем данные байка
        await this.bikeRepository.update(id, bikeDetails);

        if (prices) {
            // Получаем текущие цены для байка
            const currentPrices = await this.bikePriceRepository.find({
                where: { bike: { id } },
                relations: ['priceCategory'], // Загрузка связанных категорий
            });

            // Удаляем цены, которых больше нет в новых данных
            const currentPriceIds = currentPrices.map((price) => price.priceCategory.id);
            const newPriceIds = prices.map((price) => price.categoryId);
            const pricesToDelete = currentPrices.filter(
                (price) => !newPriceIds.includes(price.priceCategory.id),
            );

            if (pricesToDelete.length > 0) {
                const deletePriceIds = pricesToDelete.map((price) => price.id);
                await this.bikePriceRepository.delete(deletePriceIds);
            }

            // Обновляем существующие цены или создаем новые
            for (const price of prices) {
                const existingPrice = currentPrices.find(
                    (currentPrice) => currentPrice.priceCategory.id === price.categoryId,
                );

                if (existingPrice) {
                    // Обновляем существующую цену
                    await this.bikePriceRepository.update(existingPrice.id, {
                        price: price.price,
                    });
                } else {
                    // Добавляем новую цену
                    await this.bikePriceRepository.save(
                        this.bikePriceRepository.create({
                            bike: { id },
                            priceCategory: { id: price.categoryId },
                            price: price.price,
                        }),
                    );
                }
            }
        }

        // Возвращаем обновленный байк с ценами и категориями
        return this.bikeRepository.findOne({
            where: { id },
            relations: ['prices', 'prices.priceCategory'],
        });
    }

    async deleteBike(id: number): Promise<void> {
        // Удаление байка автоматически удаляет связанные цены (ON DELETE CASCADE)
        await this.bikeRepository.delete(id);
    }
}
