import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Translation } from '../entity/translations.entity'; // <-- сущность для таблицы translations
import { CreateTranslationDto } from '../dto/create-translations.dto'; // dto

@Injectable()
export class TranslationsService {
    constructor(
        @InjectRepository(Translation)
        private readonly translationRepo: Repository<Translation>,
    ) {}

    /**
     * Создаёт или обновляет перевод для указанной сущности (bike, accessory, ...)
     */
    async createOrUpdateTranslation(dto: CreateTranslationDto): Promise<Translation> {
        let translation = await this.translationRepo.findOne({
            where: {
                entityType: dto.entityType,
                entityId: dto.entityId,
                field: dto.field,
                language: dto.language,
            },
        });

        if (!translation) {
            translation = this.translationRepo.create(dto);
        } else {
            translation.translation = dto.translation;
        }

        return this.translationRepo.save(translation);
    }

    async findAllForEntity(entityType: string, entityId: number): Promise<Translation[]> {
        return this.translationRepo.find({
            where: { entityType, entityId },
        });
    }
}