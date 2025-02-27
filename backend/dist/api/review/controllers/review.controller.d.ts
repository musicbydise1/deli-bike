import { ReviewService } from '../services/review.service';
import { CreateReviewDto } from '../dto/create-review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';
import { Review } from '../entities/review.entity';
export declare class ReviewController {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    createReview(createReviewDto: CreateReviewDto): Promise<Review>;
    updateReview(id: number, updateReviewDto: UpdateReviewDto): Promise<Review>;
    deleteReview(id: number): Promise<void>;
    getReviewsByBike(bikeId: number): Promise<Review[]>;
    getReviewsByUser(userId: number): Promise<Review[]>;
    getBikeAverageRating(bikeId: number): Promise<number>;
}
