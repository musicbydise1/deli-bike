import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PriceCategory } from '../entities/price-category.entity';
import { CreatePriceCategoryDto } from '../dto/create-price-category.dto';
import { UpdatePriceCategoryDto } from '../dto/update-price-category.dto';
import { TranslationsService } from '../../../translations/service/translations.service';

@Injectable()
export class PriceCategoryService {
  constructor(
    @InjectRepository(PriceCategory)
    private readonly priceCategoryRepository: Repository<PriceCategory>,

    private readonly translationsService: TranslationsService, // <-- инжект
  ) {}

  async create(createDto: CreatePriceCategoryDto): Promise<PriceCategory> {
    // 1. Создаём и сохраняем категорию
    const { translations, ...rest } = createDto;
    const category = this.priceCategoryRepository.create(rest);
    const savedCategory = await this.priceCategoryRepository.save(category);

    // 2. Если есть переводы — создаём
    if (translations && translations.length > 0) {
      for (const t of translations) {
        await this.translationsService.createOrUpdateTranslation({
          entityType: 'price_category',
          entityId: savedCategory.id,
          field: t.field,
          language: t.language,
          translation: t.translation,
        });
      }
    }

    return savedCategory;
  }

  async findAll(): Promise<PriceCategory[]> {
    // Получаем список категорий
    const categories = await this.priceCategoryRepository.find();

    // Если нужно, подгружаем переводы для каждой
    for (const category of categories) {
      const translations = await this.translationsService.findAllForEntity(
        'price_category',
        category.id,
      );
      category['translations'] = translations; // <-- дополняем
    }

    return categories;
  }

  async findOne(id: number): Promise<PriceCategory> {
    // Находим категорию
    const category = await this.priceCategoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`Price category with id ${id} not found`);
    }

    // Подгружаем переводы
    const translations = await this.translationsService.findAllForEntity(
      'price_category',
      category.id,
    );
    category['translations'] = translations; // <-- добавляем «виртуальное» поле

    return category;
  }

  async update(id: number, updateDto: UpdatePriceCategoryDto): Promise<PriceCategory> {
    await this.priceCategoryRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.priceCategoryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Price category with id ${id} not found`);
    }
  }
}
