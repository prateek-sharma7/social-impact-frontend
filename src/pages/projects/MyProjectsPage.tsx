import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PageHeader } from "@/components/layout";
import { useMyProjects } from "@/hooks/useProjects";
import { ProjectOverviewCard } from "@/components/dashboard";
import {
  Tabs,
  TabItem,
  Button,
  Spinner,
  Alert,
  EmptyState,
  Badge,
} from "@/components/common";
import { PlusIcon, BriefcaseIcon } from "@heroicons/react/24/outline";
import { ROUTES } from "@/utils/constants";
import { ProjectResponse } from "@/types/project.types";

export const MyProjectsPage: React.FC = () => {
  const { data: projects, isLoading, error } = useMyProjects();
  const [activeTab, setActiveTab] = useState("all");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        variant="error"
        title="Error loading projects"
        message="Failed to load your projects. Please try again."
      />
    );
  }

  const allProjects = projects || [];
  const activeProjects = allProjects.filter((p) => p.status === "ACTIVE");
  const draftProjects = allProjects.filter((p) => p.status === "DRAFT");
  const completedProjects = allProjects.filter((p) => p.status === "COMPLETED");

  const tabItems: TabItem[] = [
    {
      id: "all",
      label: "All Projects",
      content: (
        <ProjectsGrid
          projects={allProjects}
          emptyMessage="You haven't created any projects yet."
        />
      ),
    },
    {
      id: "active",
      label: "Active",
      content: (
        <ProjectsGrid
          projects={activeProjects}
          emptyMessage="You don't have any active projects."
        />
      ),
    },
    {
      id: "draft",
      label: "Drafts",
      content: (
        <ProjectsGrid
          projects={draftProjects}
          emptyMessage="You don't have any draft projects."
        />
      ),
    },
    {
      id: "completed",
      label: "Completed",
      content: (
        <ProjectsGrid
          projects={completedProjects}
          emptyMessage="You don't have any completed projects."
        />
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="My Projects"
        subtitle="Manage and track all your volunteer projects"
        actions={
          <Link to={ROUTES.CREATE_PROJECT}>
            <Button leftIcon={<PlusIcon className="h-4 w-4" />}>
              Create New Project
            </Button>
          </Link>
        }
      />

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8 mb-6">
        <StatCard title="Total Projects" value={allProjects.length} />
        <StatCard
          title="Active"
          value={activeProjects.length}
          color="text-green-600"
        />
        <StatCard
          title="Drafts"
          value={draftProjects.length}
          color="text-yellow-600"
        />
        <StatCard
          title="Completed"
          value={completedProjects.length}
          color="text-blue-600"
        />
      </div>

      <Tabs items={tabItems} defaultTab="all" onChange={setActiveTab} />
    </div>
  );
};

// Helper Components
const StatCard: React.FC<{ title: string; value: number; color?: string }> = ({
  title,
  value,
  color = "text-gray-900",
}) => (
  <div className="bg-white p-4 rounded-lg border border-gray-200">
    <p className="text-sm text-gray-600">{title}</p>
    <p className={`text-2xl font-semibold ${color}`}>{value}</p>
  </div>
);

const ProjectsGrid: React.FC<{
  projects: ProjectResponse[];
  emptyMessage: string;
}> = ({ projects, emptyMessage }) => {
  if (projects.length === 0) {
    return (
      <EmptyState
        icon={<BriefcaseIcon className="h-12 w-12" />}
        title="No projects"
        description={emptyMessage}
        actionLabel="Create Project"
        onAction={() => (window.location.href = ROUTES.CREATE_PROJECT)}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {projects.map((project) => (
        <ProjectOverviewCard
          key={project.id}
          project={project}
          showApplications={false}
        />
      ))}
    </div>
  );
};
