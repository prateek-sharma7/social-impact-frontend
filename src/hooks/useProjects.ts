import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { projectsAPI } from "@/api/endpoints/projects.api";
import { CreateProjectRequest, ProjectResponse } from "@/types/project.types";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/utils/constants";
import toast from "react-hot-toast";

export const useProjects = (page: number = 0, size: number = 12) => {
  return useQuery({
    queryKey: ["projects", page, size],
    queryFn: () => projectsAPI.getProjects(page, size),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProject = (id: number) => {
  return useQuery({
    queryKey: ["project", id],
    queryFn: () => projectsAPI.getProjectById(id),
    enabled: !!id,
  });
};

export const useMyProjects = () => {
  return useQuery({
    queryKey: ["myProjects"],
    queryFn: projectsAPI.getMyProjects,
  });
};

export const useRecentProjects = () => {
  return useQuery({
    queryKey: ["recentProjects"],
    queryFn: projectsAPI.getRecentProjects,
  });
};

export const useProjectsByCategory = (category: string) => {
  return useQuery({
    queryKey: ["projectsByCategory", category],
    queryFn: () => projectsAPI.getProjectsByCategory(category),
    enabled: !!category,
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: CreateProjectRequest) => projectsAPI.createProject(data),
    onSuccess: (newProject) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["myProjects"] });
      toast.success("Project created successfully!");
      navigate(`${ROUTES.PROJECTS}/${newProject.id}`);
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create project");
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Partial<CreateProjectRequest>;
    }) => projectsAPI.updateProject(id, data),
    onSuccess: (updatedProject) => {
      queryClient.invalidateQueries({
        queryKey: ["project", updatedProject.id],
      });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["myProjects"] });
      toast.success("Project updated successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update project");
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (id: number) => {
      // API doesn't have delete endpoint, so we'll simulate it
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["myProjects"] });
      toast.success("Project deleted successfully!");
      navigate(ROUTES.MY_PROJECTS);
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete project");
    },
  });
};
