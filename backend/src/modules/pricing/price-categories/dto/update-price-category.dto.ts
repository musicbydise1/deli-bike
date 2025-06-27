import { PartialType } from "@nestjs/mapped-types";
import { CreatePriceCategoryDto } from "./create-price-category.dto";

export class UpdatePriceCategoryDto extends PartialType(
  CreatePriceCategoryDto
) {}
