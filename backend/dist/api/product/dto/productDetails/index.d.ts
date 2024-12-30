import { TypeHelpOptions } from 'class-transformer';
import { ComputerDetails } from './computer.details';
import { TestDetails } from './test.details';
export type ProductDetails = ComputerDetails | TestDetails;
export declare function ProductDetailsTypeFn(options: TypeHelpOptions): typeof ComputerDetails | typeof TestDetails;
