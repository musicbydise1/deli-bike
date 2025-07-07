import { Controller, Post, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { ReviewService } from '../services/review.service';
import { CreateReviewDto } from '../dto/create-review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';
import { Review } from '../entities/review.entity';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  async createReview(@Body() createReviewDto: CreateReviewDto): Promise<Review> {
    return this.reviewService.createReview(createReviewDto);
  }

  @Patch(':id')
  async updateReview(
    @Param('id') id: number,
    @Body() updateReviewDto: UpdateReviewDto,
  ): Promise<Review> {
    return this.reviewService.updateReview(id, updateReviewDto);
  }

  @Delete(':id')
  async deleteReview(@Param('id') id: number): Promise<void> {
    return this.reviewService.deleteReview(id);
  }

  @Get('/bike/:bikeId')
  async getReviewsByBike(@Param('bikeId') bikeId: number): Promise<Review[]> {
    return this.reviewService.getReviewsByBike(bikeId);
  }

  @Get('/user/:userId')
  async getReviewsByUser(@Param('userId') userId: number): Promise<Review[]> {
    return this.reviewService.getReviewsByUser(userId);
  }

  @Get('/bike/:bikeId/average-rating')
  async getBikeAverageRating(@Param('bikeId') bikeId: number): Promise<number> {
    return this.reviewService.getBikeAverageRating(bikeId);
  }
}
