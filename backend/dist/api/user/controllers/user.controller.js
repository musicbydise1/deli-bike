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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const auth_decorator_1 = require("../../auth/guards/auth.decorator");
const user_decorator_1 = require("../../auth/guards/user.decorator");
const user_service_1 = require("../services/user.service");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async profile(user) {
        const userWithRoles = await this.userService.findById(user.id, { relations: ['roles'] });
        const serializedUser = {
            id: userWithRoles.id,
            email: userWithRoles.email,
            firstName: userWithRoles.firstName,
            lastName: userWithRoles.lastName,
            patronymic: userWithRoles.patronymic,
            phoneNumber: userWithRoles.phoneNumber,
            companyName: userWithRoles.companyName,
            iin: userWithRoles.iin,
            idCardNumber: userWithRoles.idCardNumber,
            idCardFrontImage: userWithRoles.idCardFrontImage,
            idCardBackImage: userWithRoles.idCardBackImage,
            isVerified: userWithRoles.isVerified,
            mfaEnabled: userWithRoles.mfaEnabled,
            profileImage: userWithRoles.profileImage,
            address: userWithRoles.address,
            walletBalance: userWithRoles.walletBalance,
            subscriptionType: userWithRoles.subscriptionType,
            preferredCurrency: userWithRoles.preferredCurrency,
            createdAt: userWithRoles.createdAt,
            updatedAt: userWithRoles.updatedAt,
            roles: userWithRoles.roles.map((role) => ({
                id: role.id,
                name: role.name,
            })),
        };
        console.log('Serialized User:', serializedUser);
        return serializedUser;
    }
};
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Get)('profile'),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "profile", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map