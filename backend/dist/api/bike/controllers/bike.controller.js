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
exports.BikeController = void 0;
const common_1 = require("@nestjs/common");
const bike_service_1 = require("../services/bike.service");
const create_bike_dto_1 = require("../dto/create-bike.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const class_transformer_1 = require("class-transformer");
const create_bike_dto_2 = require("../dto/create-bike.dto");
let BikeController = class BikeController {
    constructor(bikeService) {
        this.bikeService = bikeService;
    }
    async getAllBikes() {
        return this.bikeService.findAll();
    }
    async getBikeById(id) {
        return this.bikeService.findOneById(id);
    }
    async createBike(files, bikeData) {
        console.log('Raw bikeData:', bikeData);
        console.log('Raw bikeData.prices:', bikeData.prices);
        if (files.photos && files.photos.length > 0) {
            bikeData.imageUrls = files.photos.map((file) => `http://91.243.71.138:4000/uploads/bikes/${file.filename}`);
        }
        console.log('BikeController, bikeData:', bikeData);
        if (bikeData.prices) {
            console.log('BikeController, prices:', bikeData.prices);
        }
        if (typeof bikeData.prices === 'string') {
            try {
                const parsed = JSON.parse(bikeData.prices);
                bikeData.prices = (0, class_transformer_1.plainToInstance)(create_bike_dto_2.BikePriceDto, Array.isArray(parsed) ? parsed : [parsed], {
                    excludeExtraneousValues: true,
                });
            }
            catch (e) {
                bikeData.prices = [];
            }
        }
        return this.bikeService.createBike(bikeData);
    }
    async updateBike(id, bikeData) {
        return this.bikeService.updateBike(id, bikeData);
    }
    async deleteBike(id) {
        return this.bikeService.deleteBike(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BikeController.prototype, "getAllBikes", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BikeController.prototype, "getBikeById", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([{ name: 'photos', maxCount: 5 }], {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/bikes',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const fileExtName = (0, path_1.extname)(file.originalname);
                const filename = `bike-${uniqueSuffix}${fileExtName}`;
                callback(null, filename);
            },
        }),
        fileFilter: (req, file, callback) => {
            if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
                return callback(new Error('Only image files are allowed!'), false);
            }
            callback(null, true);
        },
    })),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_bike_dto_1.CreateBikeDto]),
    __metadata("design:returntype", Promise)
], BikeController.prototype, "createBike", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], BikeController.prototype, "updateBike", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BikeController.prototype, "deleteBike", null);
BikeController = __decorate([
    (0, common_1.Controller)('bikes'),
    __metadata("design:paramtypes", [bike_service_1.BikeService])
], BikeController);
exports.BikeController = BikeController;
//# sourceMappingURL=bike.controller.js.map