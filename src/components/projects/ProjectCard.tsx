import React from "react";
import { Link } from "react-router-dom";
import { ProjectResponse } from "@/types/project.types";
import {
  Card,
  CardContent,
  Badge,
  Avatar,
  ProgressBar,
} from "@/components/common";
import {
  MapPinIcon,
  CalendarIcon,
  UsersIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { formatDate, truncateText, calculatePercentage } from "@/utils/helpers";
import { ROUTES } from "@/utils/constants";

interface ProjectCardProps {
  project: ProjectResponse;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const volunteersPercentage = calculatePercentage(
    project.volunteersRegistered,
    project.volunteersNeeded
  );

  const getDaysRemaining = () => {
    const today = new Date();
    const endDate = new Date(project.endDate);
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const daysRemaining = getDaysRemaining();

  return (
    <Link to={`${ROUTES.PROJECTS}/${project.id}`}>
      <Card hoverable className="h-full flex flex-col">
        <div className="aspect-w-16 aspect-h-9 relative">
          <img
            src={project.imageUrl || "https://via.placeholder.com/400x225"}
            alt={project.title}
            className="w-full h-48 object-cover rounded-t-xl"
          />
          <div className="absolute top-4 left-4">
            <Badge
              variant={project.status === "ACTIVE" ? "success" : "secondary"}
            >
              {project.status}
            </Badge>
          </div>
        </div>

        <CardContent className="flex-1 flex flex-col">
          <div className="mb-3">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-1">
              {project.title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {truncateText(project.description, 100)}
            </p>
          </div>

          <div className="space-y-2 mb-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Avatar name={project.organization.name} size="xs" />
              <span className="font-medium">{project.organization.name}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPinIcon className="h-4 w-4 text-gray-400" />
              <span>{project.location}</span>
            </div>

            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-gray-400" />
              <span>{formatDate(project.startDate)}</span>
            </div>

            {daysRemaining > 0 && (
              <div className="flex items-center gap-2">
                <ClockIcon className="h-4 w-4 text-gray-400" />
                <span>{daysRemaining} days remaining</span>
              </div>
            )}
          </div>

          <div className="mt-auto">
            <div className="mb-2">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-600">Volunteers</span>
                <span className="font-medium">
                  {project.volunteersRegistered} / {project.volunteersNeeded}
                </span>
              </div>
              <ProgressBar
                value={project.volunteersRegistered}
                max={project.volunteersNeeded}
                variant="primary"
                size="sm"
              />
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="secondary" size="sm">
                {project.category}
              </Badge>
              {project.projectType === "DONATION_BASED" && (
                <Badge variant="purple" size="sm">
                  💰 Donation
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
