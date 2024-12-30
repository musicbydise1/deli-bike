"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyNames = exports.CurrencyCodes = exports.Currency = void 0;
const typeorm_1 = require("typeorm");
let Currency = class Currency {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'varchar', length: 7 }),
    __metadata("design:type", String)
], Currency.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Currency.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Currency.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Currency.prototype, "updatedAt", void 0);
Currency = __decorate([
    (0, typeorm_1.Entity)()
], Currency);
exports.Currency = Currency;
var CurrencyCodes;
(function (CurrencyCodes) {
    CurrencyCodes["EGP"] = "EGP";
})(CurrencyCodes = exports.CurrencyCodes || (exports.CurrencyCodes = {}));
var CurrencyNames;
(function (CurrencyNames) {
    CurrencyNames["EGP"] = "Egyptian Pound";
})(CurrencyNames = exports.CurrencyNames || (exports.CurrencyNames = {}));
//# sourceMappingURL=currency.entity.js.map