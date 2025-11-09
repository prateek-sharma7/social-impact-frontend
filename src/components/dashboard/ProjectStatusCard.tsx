import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Badge, ProgressBar } from "@/components/common";
import { ProjectResponse } from "@/types/project.types";
import {
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { formatDate, calculatePercentage } from "@/utils/helpers";
import { ROUTES } from "@/utils/constants";

interface ProjectStatusCardProps {
  project: ProjectResponse;
}

export const ProjectStatusCard: React.FC<ProjectStatusCardProps> = ({
  project,
}) => {
  const progressPercentage = calculatePercentage(
    project.volunteersRegistered,
    project.volunteersNeeded
  );

  const getStatusBadge = () => {
    const today = new Date();
    const startDate = new Date(project.startDate);
    const endDate = new Date(project.endDate);

    if (today < startDate) {
      return <Badge variant="info">Upcoming</Badge>;
    } else if (today > endDate) {
      return <Badge variant="secondary">Completed</Badge>;
    } else {
      return <Badge variant="success">Active</Badge>;
    }
  };

  return (
    <Card hoverable>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 line-clamp-1">
                {project.title}
              </h4>
              <p className="text-sm text-gray-600">
                {project.organization.name}
              </p>
            </div>
            {getStatusBadge()}
          </div>

          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              <span>
                {formatDate(project.startDate)} - {formatDate(project.endDate)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-4 w-4" />
              <span>{project.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <UsersIcon className="h-4 w-4" />
              <span>
                {project.volunteersRegistered} / {project.volunteersNeeded}{" "}
                volunteers
              </span>
            </div>
          </div>

          <ProgressBar
            value={project.volunteersRegistered}
            max={project.volunteersNeeded}
            label="Progress"
            showLabel
            variant="primary"
          />

          <Link
            to={`${ROUTES.PROJECTS}/${project.id}`}
            className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            View Details
            <ArrowRightIcon className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
