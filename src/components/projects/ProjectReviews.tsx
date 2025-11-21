import React from "react";
import { useProjectReviews, useProjectRatingSummary } from "@/hooks/useReviews";
import {
  Card,
  CardContent,
  Rating,
  Avatar,
  Spinner,
  EmptyState,
} from "@/components/common";
import { formatRelativeTime } from "@/utils/helpers";
import { ReviewResponse } from "@/types/review.types";

interface ProjectReviewsProps {
  projectId: number;
}

export const ProjectReviews: React.FC<ProjectReviewsProps> = ({
  projectId,
}) => {
  const { data: reviewsList, isLoading: reviewsLoading } =
    useProjectReviews(projectId);
  const { data: ratingSummary, isLoading: summaryLoading } =
    useProjectRatingSummary(projectId);

  const reviews = Array.isArray(reviewsList) ? reviewsList : [];

  if (reviewsLoading || summaryLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Reviews</h2>
        <EmptyState
          title="No reviews yet"
          description="Be the first to review this project!"
        />
      </div>
    );
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Reviews</h2>

      {/* Rating Summary */}
      {ratingSummary && (
        <Card className="mb-8">
          <CardContent>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900">
                  {ratingSummary.averageRating.toFixed(1)}
                </div>
                <Rating
                  value={ratingSummary.averageRating}
                  readonly
                  size="lg"
                  className="mt-2"
                />
                <p className="text-sm text-gray-600 mt-2">
                  {ratingSummary.totalReviews} review
                  {ratingSummary.totalReviews !== 1 ? "s" : ""}
                </p>
              </div>

              <div className="flex-1">
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => {
                    const count =
                      ratingSummary.ratingDistribution[rating.toString()] || 0;
                    const percentage =
                      ratingSummary.totalReviews > 0
                        ? (count / ratingSummary.totalReviews) * 100
                        : 0;

                    return (
                      <div key={rating} className="flex items-center gap-3">
                        <span className="text-sm text-gray-600 w-8">
                          {rating}★
                        </span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-yellow-400 h-2 rounded-full transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-12 text-right">
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

interface ReviewCardProps {
  review: ReviewResponse;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <Card>
      <CardContent>
        <div className="flex items-start gap-4">
          <Avatar
            name={review.reviewer.name}
            src={review.reviewer.profilePicture}
            size="md"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="font-semibold text-gray-900">
                  {review.reviewer.name}
                </h4>
                <p className="text-sm text-gray-500">
                  {formatRelativeTime(review.createdAt)}
                </p>
              </div>
              <Rating value={review.rating} readonly size="sm" />
            </div>

            {review.comment && (
              <p className="text-gray-700 mt-3 whitespace-pre-wrap">
                {review.comment}
              </p>
            )}

            {review.organizationResponse && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900 mb-1">
                      Organization Response
                    </p>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">
                      {review.organizationResponse}
                    </p>
                    {review.responseDate && (
                      <p className="text-xs text-gray-500 mt-2">
                        {formatRelativeTime(review.responseDate)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
