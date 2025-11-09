import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Badge, Button } from "@/components/common";
import { ProjectResponse } from "@/types/project.types";
import {
  CalendarIcon,
  UsersIcon,
  DocumentTextIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { formatDate, calculatePercentage } from "@/utils/helpers";
import { ROUTES } from "@/utils/constants";

interface ProjectOverviewCardProps {
  project: ProjectResponse;
  showApplications?: boolean;
}

export const ProjectOverviewCard: React.FC<ProjectOverviewCardProps> = ({
  project,
  showApplications = true,
}) => {
  const getProjectStatusBadge = () => {
    switch (project.status) {
      case "ACTIVE":
        return <Badge variant="success">Active</Badge>;
      case "DRAFT":
        return <Badge variant="secondary">Draft</Badge>;
      case "COMPLETED":
        return <Badge variant="info">Completed</Badge>;
      case "CANCELLED":
        return <Badge variant="danger">Cancelled</Badge>;
      default:
        return null;
    }
  };

  const volunteerPercentage = calculatePercentage(
    project.volunteersRegistered,
    project.volunteersNeeded
  );

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-gray-900 line-clamp-1">
                {project.title}
              </h4>
              <p className="text-sm text-gray-600 mt-1">{project.category}</p>
            </div>
            {getProjectStatusBadge()}
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <CalendarIcon className="h-4 w-4" />
              <span>{formatDate(project.startDate)}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <UsersIcon className="h-4 w-4" />
              <span>
                {project.volunteersRegistered}/{project.volunteersNeeded}{" "}
                volunteers
              </span>
            </div>
          </div>

          {/* Volunteer Progress */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-600">Volunteer Progress</span>
              <span className="text-sm font-medium">
                {volunteerPercentage}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${volunteerPercentage}%` }}
              />
            </div>
          </div>

          {/* Application Count for Active Projects */}
          {showApplications && project.status === "ACTIVE" && (
            <div className="flex items-center justify-between p-3 bg-primary-50 rounded-lg">
              <div className="flex items-center gap-2">
                <DocumentTextIcon className="h-5 w-5 text-primary-600" />
                <span className="text-sm font-medium text-primary-900">
                  {project.proposalCount || 0} pending applications
                </span>
              </div>
              <Link to={`/projects/${project.id}/applications`}>
                <span className="text-sm font-medium text-primary-600 hover:text-primary-700">
                  Review →
                </span>
              </Link>
            </div>
          )}

          <div className="flex gap-2">
            <Link to={`${ROUTES.PROJECTS}/${project.id}`} className="flex-1">
              <Button variant="outline" size="sm" fullWidth>
                View Details
              </Button>
            </Link>
            {project.status === "DRAFT" && (
              <Link
                to={`${ROUTES.EDIT_PROJECT.replace(
                  ":id",
                  project.id.toString()
                )}`}
                className="flex-1"
              >
                <Button
                  size="sm"
                  fullWidth
                  leftIcon={<PencilIcon className="h-4 w-4" />}
                >
                  Edit
                </Button>
              </Link>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
