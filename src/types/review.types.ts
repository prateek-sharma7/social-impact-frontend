import { ReviewType } from "@/utils/constants";

/**
 * Reviewer Info
 */
export interface ReviewerInfo {
  id: number;
  name: string;
  profilePicture?: string;
}

/**
 * User Info
 */
export interface UserInfo {
  id: number;
  name: string;
  role: string;
}

/**
 * Project Info
 */
export interface ProjectInfo {
  id: number;
  title: string;
}

/**
 * Review Response
 */
export interface ReviewResponse {
  id: number;
  reviewer: ReviewerInfo;
  reviewedUser: UserInfo;
  project: ProjectInfo;
  rating: number;
  comment?: string;
  reviewType: ReviewType;
  isVerified: boolean;
  createdAt: string;
  organizationResponse?: string;
  responseDate?: string;
}

/**
 * Create Review Request
 */
export interface CreateReviewRequest {
  projectId: number;
  reviewedUserId: number;
  rating: number;
  comment?: string;
  reviewType: ReviewType;
}

/**
 * Review Response Request
 */
export interface ReviewResponseRequest {
  response: string;
}

/**
 * Rating Summary Response
 */
export interface RatingSummaryResponse {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: Record<string, number>;
  recentReviews: ReviewResponse[];
  recommendationPercentage: number;
}
