import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Avatar, Badge, Button } from "@/components/common";
import { VolunteerApplicationResponse } from "@/types/volunteer.types";
import { formatRelativeTime } from "@/utils/helpers";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface PendingApplicationCardProps {
  application: VolunteerApplicationResponse;
  onApprove?: (id: number) => void;
  onReject?: (id: number) => void;
}

export const PendingApplicationCard: React.FC<PendingApplicationCardProps> = ({
  application,
  onApprove,
  onReject,
}) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent>
        <div className="flex items-start gap-4">
          <Avatar name={application.volunteerName} size="md" />

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h5 className="font-semibold text-gray-900">
                  {application.volunteerName}
                </h5>
                <p className="text-sm text-gray-600">
                  Applied to: {application.projectTitle}
                </p>
              </div>
              <Badge variant="warning" size="sm">
                Pending
              </Badge>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span>{application.volunteerEmail}</span>
              <span>•</span>
              <span>{formatRelativeTime(application.appliedAt)}</span>
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                variant="primary"
                leftIcon={<CheckIcon className="h-4 w-4" />}
                onClick={() => onApprove?.(application.volunteerId)}
              >
                Approve
              </Button>
              <Button
                size="sm"
                variant="outline"
                leftIcon={<XMarkIcon className="h-4 w-4" />}
                onClick={() => onReject?.(application.volunteerId)}
              >
                Reject
              </Button>
              <Link to={`/applications/${application.volunteerId}`}>
                <Button size="sm" variant="ghost">
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
