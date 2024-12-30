"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDetailsTypeFn = void 0;
const common_1 = require("@nestjs/common");
const category_entity_1 = require("../../../../database/entities/category.entity");
const computer_details_1 = require("./computer.details");
const test_details_1 = require("./test.details");
function ProductDetailsTypeFn(options) {
    var _a, _b;
    switch ((_b = (_a = options.object) === null || _a === void 0 ? void 0 : _a.details) === null || _b === void 0 ? void 0 : _b.category) {
        case category_entity_1.Categories.Computers:
            return computer_details_1.ComputerDetails;
        case 'Test':
            return test_details_1.TestDetails;
    }
    throw new common_1.BadRequestException('invalid details.category input');
}
exports.ProductDetailsTypeFn = ProductDetailsTypeFn;
//# sourceMappingURL=index.js.map