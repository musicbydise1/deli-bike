import { Repository } from 'typeorm';
import { Review } from '../entities/review.entity';
import { CreateReviewDto } from '../dto/create-review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';
export declare class ReviewService {
    private reviewRepository;
    constructor(reviewRepository: Repository<Review>);
    createReview(createReviewDto: CreateReviewDto): Promise<Review>;
    updateReview(id: number, updateReviewDto: UpdateReviewDto): Promise<Review>;
    deleteReview(id: number): Promise<void>;
    getReviewsByBike(bikeId: number): Promise<Review[]>;
    getReviewsByUser(userId: number): Promise<Review[]>;
    getBikeAverageRating(bikeId: number): Promise<number>;
}
