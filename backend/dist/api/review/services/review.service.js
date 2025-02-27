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
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const review_entity_1 = require("../entities/review.entity");
let ReviewService = class ReviewService {
    constructor(reviewRepository) {
        this.reviewRepository = reviewRepository;
    }
    async createReview(createReviewDto) {
        const { userId, bikeId, rating, comment } = createReviewDto;
        const review = this.reviewRepository.create({
            user: { id: userId },
            bike: { id: bikeId },
            rating,
            comment,
        });
        return this.reviewRepository.save(review);
    }
    async updateReview(id, updateReviewDto) {
        const review = await this.reviewRepository.findOne({ where: { id } });
        if (!review) {
            throw new common_1.NotFoundException(`Review with ID ${id} not found`);
        }
        Object.assign(review, updateReviewDto);
        return this.reviewRepository.save(review);
    }
    async deleteReview(id) {
        const review = await this.reviewRepository.findOne({ where: { id } });
        if (!review) {
            throw new common_1.NotFoundException(`Review with ID ${id} not found`);
        }
        await this.reviewRepository.remove(review);
    }
    async getReviewsByBike(bikeId) {
        return this.reviewRepository.find({ where: { bike: { id: bikeId } }, relations: ['user'] });
    }
    async getReviewsByUser(userId) {
        return this.reviewRepository.find({ where: { user: { id: userId } }, relations: ['bike'] });
    }
    async getBikeAverageRating(bikeId) {
        const { avg } = await this.reviewRepository
            .createQueryBuilder('review')
            .select('AVG(review.rating)', 'avg')
            .where('review.bikeId = :bikeId', { bikeId })
            .getRawOne();
        return parseFloat(avg) || 0;
    }
};
ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(review_entity_1.Review)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ReviewService);
exports.ReviewService = ReviewService;
//# sourceMappingURL=review.service.js.map