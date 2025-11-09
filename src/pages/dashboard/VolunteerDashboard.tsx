import React from "react";
import { PageHeader } from "@/components/layout";
import { formatDate } from "@/utils/helpers";
import { useVolunteerDashboard } from "@/hooks/useDashboard";
import {
  StatsCard,
  ProjectStatusCard,
  AchievementCard,
  ActivityTimeline,
  QuickActions,
  RecommendedProjects,
} from "@/components/dashboard";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Spinner,
  Alert,
  EmptyState,
} from "@/components/common";
import {
  BriefcaseIcon,
  ClockIcon,
  BuildingOfficeIcon,
  TrophyIcon,
  ChartBarIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

export const VolunteerDashboard: React.FC = () => {
  const { data: dashboard, isLoading, error } = useVolunteerDashboard();

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
    completedProjects,
    recentAchievements,
  } = dashboard;

  // Sample activities for timeline
  const recentActivities = [
    {
      id: "1",
      type: "application_approved" as const,
      title: "Application Approved",
      description: 'Your application for "Beach Cleanup" was approved',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    },
    {
      id: "2",
      type: "project_completed" as const,
      title: "Project Completed",
      description: 'You completed "Food Drive 2024"',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    },
    {
      id: "3",
      type: "review_received" as const,
      title: "New Review",
      description: "Green Earth Foundation left you a 5-star review",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome back, ${userInfo.firstName}!`}
        subtitle="Track your volunteer journey and discover new opportunities"
      />

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Projects Joined"
          value={stats.totalProjectsCreated}
          icon={<BriefcaseIcon className="h-6 w-6" />}
          color="primary"
          trend={{ value: 12, label: "from last month" }}
        />
        <StatsCard
          title="Active Projects"
          value={stats.activeProjects}
          icon={<ChartBarIcon className="h-6 w-6" />}
          color="secondary"
        />
        <StatsCard
          title="Hours Contributed"
          value="156"
          subtitle="hours"
          icon={<ClockIcon className="h-6 w-6" />}
          color="purple"
          trend={{ value: 8, label: "this month" }}
        />
        <StatsCard
          title="Organizations Helped"
          value={stats.totalVolunteersEngaged}
          icon={<BuildingOfficeIcon className="h-6 w-6" />}
          color="accent"
        />
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Projects & Recommendations */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Projects */}
          {activeProjects.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Your Active Projects
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeProjects.map((project) => (
                  <ProjectStatusCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          )}

          {/* Recommended Projects */}
          <RecommendedProjects projects={[]} />

          {/* Recent Achievements */}
          {recentAchievements.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TrophyIcon className="h-5 w-5 text-yellow-600" />
                  <CardTitle>Recent Achievements</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {recentAchievements.map((achievement) => (
                    <AchievementCard
                      key={achievement.id}
                      achievement={achievement}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Activity & Stats */}
        <div className="space-y-6">
          {/* Impact Score */}
          <Card>
            <CardContent>
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-primary-100 mb-4">
                  <StarIcon className="h-10 w-10 text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">4.8</h3>
                <p className="text-sm text-gray-600 mt-1">Impact Score</p>
                <p className="text-xs text-gray-500 mt-2">
                  Based on {stats.totalProjectsCreated} projects and reviews
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ActivityTimeline activities={recentActivities} />
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              {completedProjects.length > 0 ? (
                <div className="space-y-3">
                  {completedProjects.slice(0, 3).map((project) => (
                    <div key={project.id} className="text-sm">
                      <p className="font-medium text-gray-900">
                        {project.title}
                      </p>
                      <p className="text-gray-600">
                        {formatDate(project.startDate)} at {project.location}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No upcoming events"
                  description="Your upcoming projects will appear here"
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
