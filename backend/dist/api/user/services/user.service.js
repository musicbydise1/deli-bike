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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const bcrypt_1 = require("bcrypt");
const typeorm_2 = require("@nestjs/typeorm");
const user_entity_1 = require("../../../database/entities/user.entity");
const custom_1 = require("../../../errors/custom");
let UserService = class UserService {
    constructor(repository) {
        this.repository = repository;
    }
    async createUser(body, ...roles) {
        body.password = await (0, bcrypt_1.hash)(body.password, 10);
        const user = this.repository.create(Object.assign(Object.assign({}, body), { roles }));
        return this.repository.save(user);
    }
    async findByEmail(email, relations) {
        const user = await this.repository.findOne({
            where: {
                email,
            },
            relations,
        });
        return user;
    }
    async comparePassword(password, userPassword) {
        return (0, bcrypt_1.compare)(password, userPassword);
    }
    async findById(id, relations) {
        const user = await this.repository.findOne({
            where: {
                id,
            },
            relations,
        });
        if (!user) {
            throw new common_1.NotFoundException(custom_1.errorMessages.user.notFound);
        }
        return user;
    }
    async save(user) {
        return this.repository.save(user);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map