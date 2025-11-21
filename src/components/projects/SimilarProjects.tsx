import React from "react";
import { ProjectResponse } from "@/types/project.types";
import { ProjectCard } from "./ProjectCard";
import { Spinner, EmptyState } from "@/components/common";
import { useSimilarProjects } from "@/hooks/useSearch";

interface SimilarProjectsProps {
  projectId: number;
}

export const SimilarProjects: React.FC<SimilarProjectsProps> = ({
  projectId,
}) => {
  const { data: similarProjects, isLoading, error } = useSimilarProjects(projectId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !similarProjects || similarProjects.length === 0) {
    return null; // Don't show anything if no similar projects
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Similar Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {similarProjects.slice(0, 6).map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

