"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const sucess_response_interceptor_1 = require("../common/helper/sucess-response.interceptor");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const role_module_1 = require("./role/role.module");
const product_module_1 = require("./product/product.module");
const errors_filter_1 = require("../errors/errors.filter");
let ApiModule = class ApiModule {
};
ApiModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, user_module_1.UserModule, role_module_1.RoleModule, product_module_1.ProductModule],
        providers: [
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: sucess_response_interceptor_1.SucessResponseInterceptor,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: errors_filter_1.ErrorsFilter,
            },
        ],
    })
], ApiModule);
exports.ApiModule = ApiModule;
//# sourceMappingURL=api.module.js.map