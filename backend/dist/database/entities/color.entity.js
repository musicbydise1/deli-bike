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
exports.ColorsHexCodes = exports.Colors = exports.Color = void 0;
const typeorm_1 = require("typeorm");
let Color = class Color {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'varchar', length: 30 }),
    __metadata("design:type", String)
], Color.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 10 }),
    __metadata("design:type", String)
], Color.prototype, "hexCode", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Color.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Color.prototype, "updatedAt", void 0);
Color = __decorate([
    (0, typeorm_1.Entity)()
], Color);
exports.Color = Color;
var Colors;
(function (Colors) {
    Colors["NA"] = "NA";
    Colors["Red"] = "red";
    Colors["Green"] = "green";
    Colors["Blue"] = "blue";
})(Colors = exports.Colors || (exports.Colors = {}));
var ColorsHexCodes;
(function (ColorsHexCodes) {
    ColorsHexCodes["NA"] = "NA";
    ColorsHexCodes["Red"] = "#FF0000";
    ColorsHexCodes["Green"] = "#00FF00";
    ColorsHexCodes["Blue"] = "#0000FF";
})(ColorsHexCodes = exports.ColorsHexCodes || (exports.ColorsHexCodes = {}));
//# sourceMappingURL=color.entity.js.map