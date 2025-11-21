import { useQuery } from "@tanstack/react-query";
import { searchAPI } from "@/api/endpoints/search.api";
import { ProjectResponse } from "@/types/project.types";
import { ProjectSearchRequest } from "@/types/search.types";

/**
 * Hook to search projects
 */
export const useSearchProjects = (params: ProjectSearchRequest) => {
  return useQuery({
    queryKey: ["searchProjects", params],
    queryFn: () => searchAPI.searchProjects(params),
    enabled: !!params.keyword || Object.keys(params).length > 0,
  });
};

/**
 * Hook to get similar projects
 */
export const useSimilarProjects = (projectId: number) => {
  return useQuery<ProjectResponse[]>({
    queryKey: ["similarProjects", projectId],
    queryFn: () => searchAPI.getSimilarProjects(projectId),
    enabled: !!projectId,
  });
};

/**
 * Hook to get project recommendations
 */
export const useProjectRecommendations = () => {
  return useQuery<ProjectResponse[]>({
    queryKey: ["projectRecommendations"],
    queryFn: searchAPI.getRecommendedProjects,
  });
};
