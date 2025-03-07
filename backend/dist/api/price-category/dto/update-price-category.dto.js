"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePriceCategoryDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_price_category_dto_1 = require("./create-price-category.dto");
class UpdatePriceCategoryDto extends (0, mapped_types_1.PartialType)(create_price_category_dto_1.CreatePriceCategoryDto) {
}
exports.UpdatePriceCategoryDto = UpdatePriceCategoryDto;
//# sourceMappingURL=update-price-category.dto.js.map