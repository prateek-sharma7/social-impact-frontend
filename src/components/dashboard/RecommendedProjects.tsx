import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Button,
  EmptyState,
} from "@/components/common";
import { ProjectResponse } from "@/types/project.types";
import {
  MapPinIcon,
  CalendarIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { truncateText, formatDate } from "@/utils/helpers";
import { ROUTES } from "@/utils/constants";

interface RecommendedProjectsProps {
  projects: ProjectResponse[];
}

export const RecommendedProjects: React.FC<RecommendedProjectsProps> = ({
  projects,
}) => {
  if (projects.length === 0) {
    return (
      <Card>
        <CardContent>
          <EmptyState
            title="No recommendations yet"
            description="Complete your profile and add skills to get personalized project recommendations."
            actionLabel="Update Profile"
            onAction={() => (window.location.href = ROUTES.PROFILE)}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recommended for You</CardTitle>
          <Link to={ROUTES.PROJECTS}>
            <Button variant="ghost" size="sm">
              View All
              <ArrowRightIcon className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.slice(0, 3).map((project) => (
            <div
              key={project.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <h5 className="font-semibold text-gray-900 line-clamp-1">
                  {project.title}
                </h5>
                <Badge variant="primary" size="sm">
                  {project.category}
                </Badge>
              </div>

              <p className="text-sm text-gray-600 mb-3">
                {truncateText(project.description, 120)}
              </p>

              <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                <div className="flex items-center gap-1">
                  <MapPinIcon className="h-4 w-4" />
                  <span>{project.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" />
                  <span>{formatDate(project.startDate)}</span>
                </div>
              </div>

              <Link
                to={`${ROUTES.PROJECTS}/${project.id}`}
                className="text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                Learn More →
              </Link>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
