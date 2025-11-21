import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { reviewsAPI } from "@/api/endpoints/reviews.api";
import {
  ReviewResponse,
  CreateReviewRequest,
  ReviewResponseRequest,
  RatingSummaryResponse,
} from "@/types/review.types";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/utils/helpers";

/**
 * Hook to get reviews by project ID
 */
export const useProjectReviews = (projectId: number) => {
  return useQuery<ReviewResponse[]>({
    queryKey: ["projectReviews", projectId],
    queryFn: () => reviewsAPI.getProjectReviews(projectId),
    enabled: !!projectId,
  });
};

/**
 * Hook to get rating summary for a project
 */
export const useProjectRatingSummary = (projectId: number) => {
  return useQuery<RatingSummaryResponse>({
    queryKey: ["projectRatingSummary", projectId],
    queryFn: () => reviewsAPI.getProjectRatingSummary(projectId),
    enabled: !!projectId,
  });
};

/**
 * Hook to get reviews by user ID
 */
export const useUserReviews = (userId: number) => {
  return useQuery<ReviewResponse[]>({
    queryKey: ["userReviews", userId],
    queryFn: () => reviewsAPI.getUserReviews(userId),
    enabled: !!userId,
  });
};

/**
 * Hook to create a review
 */
export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateReviewRequest) => reviewsAPI.createReview(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["projectReviews", variables.projectId],
      });
      queryClient.invalidateQueries({
        queryKey: ["projectRatingSummary", variables.projectId],
      });
      toast.success("Review submitted successfully!");
    },
    onError: (error: any) => {
      toast.error(getErrorMessage(error));
    },
  });
};

/**
 * Hook to add response to a review
 */
export const useAddReviewResponse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      reviewId,
      data,
    }: {
      reviewId: number;
      data: ReviewResponseRequest;
    }) => reviewsAPI.addReviewResponse(reviewId, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["projectReviews", response.project.id],
      });
      toast.success("Response added successfully!");
    },
    onError: (error: any) => {
      toast.error(getErrorMessage(error));
    },
  });
};
