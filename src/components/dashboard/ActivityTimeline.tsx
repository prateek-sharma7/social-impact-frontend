import React from "react";
import {
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { formatRelativeTime } from "@/utils/helpers";
import { cn } from "@/utils/helpers";

interface Activity {
  id: string;
  type:
    | "application_approved"
    | "application_rejected"
    | "project_completed"
    | "review_received";
  title: string;
  description: string;
  timestamp: string;
}

interface ActivityTimelineProps {
  activities: Activity[];
}

export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({
  activities,
}) => {
  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "application_approved":
        return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
      case "application_rejected":
        return <XCircleIcon className="h-5 w-5 text-red-600" />;
      case "project_completed":
        return <ClockIcon className="h-5 w-5 text-blue-600" />;
      case "review_received":
        return <StarIcon className="h-5 w-5 text-yellow-600" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {activities.map((activity, idx) => (
          <li key={activity.id}>
            <div className="relative pb-8">
              {idx !== activities.length - 1 && (
                <span
                  className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              )}
              <div className="relative flex items-start space-x-3">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                    {getActivityIcon(activity.type)}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {activity.title}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {activity.description}
                    </p>
                    <p className="mt-2 text-xs text-gray-500">
                      {formatRelativeTime(activity.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
