import { PartialType } from "@nestjs/mapped-types";
import { CreateRentalDto } from "./create-rental.dto";

export class CompleteRentalDto extends PartialType(CreateRentalDto) {}
