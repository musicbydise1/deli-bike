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
exports.RoleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const role_entity_1 = require("../../../database/entities/role.entity");
const user_service_1 = require("../../user/services/user.service");
const custom_1 = require("../../../errors/custom");
let RoleService = class RoleService {
    constructor(rolesRepository, userService) {
        this.rolesRepository = rolesRepository;
        this.userService = userService;
    }
    async assignRoleToUser(data) {
        const role = await this.findById(data.roleId);
        const user = await this.userService.findById(data.userId, { relations: ['roles'] });
        if (!user.roles.some((userRole) => userRole.id === data.roleId)) {
            user.roles.push(role);
            await this.userService.save(user);
        }
    }
    async findById(roleId) {
        const role = await this.rolesRepository.findOne({
            where: {
                id: roleId,
            },
        });
        if (!role) {
            throw new common_1.NotFoundException(custom_1.errorMessages.role.notFound);
        }
        return role;
    }
};
RoleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_service_1.UserService])
], RoleService);
exports.RoleService = RoleService;
//# sourceMappingURL=role.service.js.map