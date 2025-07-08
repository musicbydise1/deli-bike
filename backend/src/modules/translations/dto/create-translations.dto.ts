export class CreateTranslationDto {
  entityType: string; // "bike" | "accessory" | "price_category"
  entityId: number; // ID конкретной записи
  field: string; // "name" | "description" и т.д.
  language: string; // "ru" | "en" | ...
  translation: string;
}
