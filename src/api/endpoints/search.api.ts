import { ProjectResponse } from "@/types/project.types";
import { API_ENDPOINTS } from "@/utils/constants";
import apiClient from "../client";
import {
  ProjectSearchRequest,
  SearchFiltersResponse,
  SearchResponse,
} from "@/types/search.types";

export const searchAPI = {
  /**
   * Get similar projects by project ID
   */
  getSimilarProjects: async (projectId: number): Promise<ProjectResponse[]> => {
    const response = await apiClient.get(
      API_ENDPOINTS.SEARCH.SIMILAR(projectId)
    );
    return response.data;
  },

  /**
   * Get recommended projects
   */
  getRecommendedProjects: async (): Promise<ProjectResponse[]> => {
    const response = await apiClient.get(API_ENDPOINTS.SEARCH.RECOMMENDATIONS);
    return response.data;
  },

  /**
   * Get projects by search filters
   */
  searchProjects: async (
    data: ProjectSearchRequest
  ): Promise<SearchResponse<ProjectResponse>> => {
    const response = await apiClient.post(API_ENDPOINTS.SEARCH.PROJECTS, data, {
      params: {
        page: data.page ?? 0,
        size: data.size ?? 12,
      },
    });

    return response.data;
  },

  /**
   * Get available search filters (categories, locations, skills, ranges)
   */
  getFilters: async (): Promise<SearchFiltersResponse> => {
    const response = await apiClient.get(API_ENDPOINTS.SEARCH.FILTERS);
    return response.data;
  },
};
