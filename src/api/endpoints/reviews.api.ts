import apiClient from "../client";
import { API_ENDPOINTS } from "@/utils/constants";
import {
  ReviewResponse,
  CreateReviewRequest,
  ReviewResponseRequest,
  RatingSummaryResponse,
} from "@/types/review.types";

/**
 * Reviews API
 */
export const reviewsAPI = {
  /**
   * Get reviews for a specific user
   */
  getUserReviews: async (userId: number): Promise<ReviewResponse[]> => {
    const response = await apiClient.get(API_ENDPOINTS.REVIEWS.BY_USER(userId));
    return response.data;
  },

  /**
   * Get reviews for a specific project
   */
  getProjectReviews: async (projectId: number): Promise<ReviewResponse[]> => {
    const response = await apiClient.get(
      API_ENDPOINTS.REVIEWS.BY_PROJECT(projectId)
    );
    return response.data;
  },

  /**
   * Get rating summary for a project
   */
  getProjectRatingSummary: async (
    projectId: number
  ): Promise<RatingSummaryResponse> => {
    const response = await apiClient.get(
      API_ENDPOINTS.REVIEWS.RATING_SUMMARY(projectId)
    );
    return response.data;
  },

  /**
   * Create a new review
   */
  createReview: async (data: CreateReviewRequest): Promise<ReviewResponse> => {
    const response = await apiClient.post(API_ENDPOINTS.REVIEWS.CREATE, data);
    return response.data;
  },

  /**
   * Add a response to a review (e.g., organization response)
   */
  addReviewResponse: async (
    reviewId: number,
    data: ReviewResponseRequest
  ): Promise<ReviewResponse> => {
    const response = await apiClient.post(
      API_ENDPOINTS.REVIEWS.ADD_RESPONSE(reviewId),
      data
    );
    return response.data;
  },
};
