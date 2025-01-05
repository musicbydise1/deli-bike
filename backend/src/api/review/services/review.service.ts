import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from '../entities/review.entity';
import { CreateReviewDto } from '../dto/create-review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';

@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(Review)
        private reviewRepository: Repository<Review>,
    ) {}

    async createReview(createReviewDto: CreateReviewDto): Promise<Review> {
        const { userId, bikeId, rating, comment } = createReviewDto;

        const review = this.reviewRepository.create({
            user: { id: userId }, // Используем связь с сущностью User
            bike: { id: bikeId }, // Используем связь с сущностью Bike
            rating,
            comment,
        });

        return this.reviewRepository.save(review);
    }

    async updateReview(id: number, updateReviewDto: UpdateReviewDto): Promise<Review> {
        const review = await this.reviewRepository.findOne({ where: { id } });
        if (!review) {
            throw new NotFoundException(`Review with ID ${id} not found`);
        }

        Object.assign(review, updateReviewDto);
        return this.reviewRepository.save(review);
    }

    async deleteReview(id: number): Promise<void> {
        const review = await this.reviewRepository.findOne({ where: { id } });
        if (!review) {
            throw new NotFoundException(`Review with ID ${id} not found`);
        }

        await this.reviewRepository.remove(review);
    }

    async getReviewsByBike(bikeId: number): Promise<Review[]> {
        return this.reviewRepository.find({ where: { bike: { id: bikeId } }, relations: ['user'] });
    }

    async getReviewsByUser(userId: number): Promise<Review[]> {
        return this.reviewRepository.find({ where: { user: { id: userId } }, relations: ['bike'] });
    }

    async getBikeAverageRating(bikeId: number): Promise<number> {
        const { avg } = await this.reviewRepository
            .createQueryBuilder('review')
            .select('AVG(review.rating)', 'avg')
            .where('review.bikeId = :bikeId', { bikeId })
            .getRawOne();

        return parseFloat(avg) || 0;
    }
}