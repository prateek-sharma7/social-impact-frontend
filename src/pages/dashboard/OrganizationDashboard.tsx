import React from "react";
import { PageHeader } from "@/components/layout";
import { useOrganizationDashboard } from "@/hooks/useDashboard";
import {
  StatsCard,
  ProjectOverviewCard,
  PendingApplicationCard,
  OrganizationQuickActions,
  VolunteerEngagementChart,
} from "@/components/dashboard";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Spinner,
  Alert,
  Button,
  EmptyState,
  Badge,
} from "@/components/common";
import {
  BriefcaseIcon,
  UserGroupIcon,
  DocumentTextIcon,
  StarIcon,
  PlusIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { ROUTES } from "@/utils/constants";
import toast from "react-hot-toast";
import { formatRelativeTime } from "@/utils/helpers";
import { Avatar } from "@/components/common";
import { VolunteerApplicationResponse } from "@/types/volunteer.types";
import { ProjectResponse } from "@/types/project.types";

export const OrganizationDashboard: React.FC = () => {
  const { data: dashboard, isLoading, error } = useOrganizationDashboard();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error || !dashboard) {
    return (
      <Alert
        variant="error"
        title="Error loading dashboard"
        message="Failed to load your dashboard. Please try again."
      />
    );
  }

  const {
    userInfo,
    stats,
    activeProjects,
    draftProjects,
    pendingApplications,
  } = dashboard;

  // Sample data for engagement chart
  const engagementData = [
    { month: "Jan", volunteers: 12, hours: 156 },
    { month: "Feb", volunteers: 18, hours: 234 },
    { month: "Mar", volunteers: 25, hours: 312 },
    { month: "Apr", volunteers: 22, hours: 298 },
    { month: "May", volunteers: 30, hours: 380 },
    { month: "Jun", volunteers: 35, hours: 420 },
  ];

  const handleApproveApplication = (volunteerId: number) => {
    // TODO: Implement application approval
    toast.success("Application approved successfully!");
  };

  const handleRejectApplication = (volunteerId: number) => {
    // TODO: Implement application rejection
    toast.error("Application rejected");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome back, ${
          userInfo.organizationName || userInfo.firstName
        }!`}
        subtitle="Manage your projects and connect with volunteers"
        actions={
          <Link to={ROUTES.CREATE_PROJECT}>
            <Button leftIcon={<PlusIcon className="h-4 w-4" />}>
              Create New Project
            </Button>
          </Link>
        }
      />

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Projects"
          value={stats.totalProjectsCreated}
          icon={<BriefcaseIcon className="h-6 w-6" />}
          color="primary"
        />
        <StatsCard
          title="Active Projects"
          value={stats.activeProjects}
          icon={<DocumentTextIcon className="h-6 w-6" />}
          color="secondary"
          trend={{ value: 15, label: "from last month" }}
        />
        <StatsCard
          title="Total Volunteers"
          value={stats.totalVolunteersEngaged}
          icon={<UserGroupIcon className="h-6 w-6" />}
          color="purple"
        />
        <StatsCard
          title="Average Rating"
          value={stats.averageProjectRating.toFixed(1)}
          icon={<StarIcon className="h-6 w-6" />}
          color="accent"
        />
      </div>

      {/* Quick Actions */}
      <OrganizationQuickActions />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Projects & Applications */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pending Applications Alert */}
          {stats.pendingApplications > 0 && (
            <Alert
              variant="warning"
              title={`You have ${stats.pendingApplications} pending applications`}
              message="Review and respond to volunteer applications to keep them engaged."
              closable
            />
          )}

          {/* Active Projects */}
          {activeProjects.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Active Projects
                </h3>
                <Link to={ROUTES.MY_PROJECTS}>
                  <Button variant="ghost" size="sm">
                    View All
                    <ArrowRightIcon className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeProjects.slice(0, 4).map((project: ProjectResponse) => (
                  <ProjectOverviewCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          )}

          {/* Draft Projects */}
          {draftProjects.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Draft Projects</CardTitle>
                  <Badge variant="secondary">{draftProjects.length}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {draftProjects.map((project: ProjectResponse) => (
                    <div
                      key={project.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                    >
                      <div>
                        <h5 className="font-medium text-gray-900">
                          {project.title}
                        </h5>
                        <p className="text-sm text-gray-600">
                          Created {formatRelativeTime(project.createdAt)}
                        </p>
                      </div>
                      <Link
                        to={`${ROUTES.EDIT_PROJECT.replace(
                          ":id",
                          project.id.toString()
                        )}`}
                      >
                        <Button size="sm" variant="outline">
                          Continue Editing
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Applications */}
          {pendingApplications.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Recent Applications
                </h3>
                <Link to="/applications">
                  <Button variant="ghost" size="sm">
                    View All
                    <ArrowRightIcon className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="space-y-4">
                {pendingApplications
                  .slice(0, 3)
                  .map((application: VolunteerApplicationResponse) => (
                    <PendingApplicationCard
                      key={`${application.volunteerId}-${application.projectId}`}
                      application={application}
                      onApprove={handleApproveApplication}
                      onReject={handleRejectApplication}
                    />
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Analytics & Insights */}
        <div className="space-y-6">
          {/* Volunteer Engagement Chart */}
          <VolunteerEngagementChart data={engagementData} />

          {/* Project Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Project Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">
                      Completion Rate
                    </span>
                    <span className="text-sm font-semibold">78%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full"
                      style={{ width: "78%" }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">
                      Volunteer Retention
                    </span>
                    <span className="text-sm font-semibold">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-secondary-600 h-2 rounded-full"
                      style={{ width: "85%" }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">
                      Application Success
                    </span>
                    <span className="text-sm font-semibold">62%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: "62%" }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Volunteers */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Top Volunteers</CardTitle>
                <Link to="/volunteers">
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {activeProjects.length > 0 ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Avatar name="Sarah Johnson" size="sm" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Sarah Johnson
                      </p>
                      <p className="text-xs text-gray-600">
                        48 hours contributed
                      </p>
                    </div>
                    <Badge variant="primary" size="sm">
                      5.0 ⭐
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <Avatar name="Michael Chen" size="sm" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Michael Chen
                      </p>
                      <p className="text-xs text-gray-600">
                        36 hours contributed
                      </p>
                    </div>
                    <Badge variant="primary" size="sm">
                      4.9 ⭐
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <Avatar name="Emily Davis" size="sm" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Emily Davis
                      </p>
                      <p className="text-xs text-gray-600">
                        32 hours contributed
                      </p>
                    </div>
                    <Badge variant="primary" size="sm">
                      4.8 ⭐
                    </Badge>
                  </div>
                </div>
              ) : (
                <EmptyState
                  title="No volunteers yet"
                  description="Start by creating and promoting your projects"
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
