import apiClient from "../client";
import { API_ENDPOINTS } from "@/utils/constants";
import {
  ProjectResponse,
  CreateProjectRequest,
  CreateDonationProjectRequest,
} from "@/types/project.types";
import { PageResponse } from "@/types/common.types";

/**
 * Projects API
 */
export const projectsAPI = {
  /**
   * Get all projects with pagination
   */
  getProjects: async (
    page: number = 0,
    size: number = 12
  ): Promise<PageResponse<ProjectResponse>> => {
    const response = await apiClient.get(API_ENDPOINTS.PROJECTS.LIST, {
      params: { page, size },
    });
    return response.data;
  },

  /**
   * Get project by ID
   */
  getProjectById: async (id: number): Promise<ProjectResponse> => {
    const response = await apiClient.get(API_ENDPOINTS.PROJECTS.BY_ID(id));
    return response.data;
  },

  /**
   * Create project
   */
  createProject: async (
    data: CreateProjectRequest
  ): Promise<ProjectResponse> => {
    const response = await apiClient.post(API_ENDPOINTS.PROJECTS.CREATE, data);
    return response.data;
  },

  /**
   * Create project with files
   */
  createProjectWithFiles: async (
    formData: FormData
  ): Promise<ProjectResponse> => {
    const response = await apiClient.post(
      API_ENDPOINTS.PROJECTS.CREATE_WITH_FILES,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  /**
   * Update project
   */
  updateProject: async (
    id: number,
    data: Partial<CreateProjectRequest>
  ): Promise<ProjectResponse> => {
    const response = await apiClient.put(
      API_ENDPOINTS.PROJECTS.UPDATE(id),
      data
    );
    return response.data;
  },

  /**
   * Get my projects
   */
  getMyProjects: async (): Promise<ProjectResponse[]> => {
    const response = await apiClient.get(API_ENDPOINTS.PROJECTS.MY_PROJECTS);
    return response.data;
  },

  /**
   * Get recent projects
   */
  getRecentProjects: async (): Promise<ProjectResponse[]> => {
    const response = await apiClient.get(API_ENDPOINTS.PROJECTS.RECENT);
    return response.data;
  },

  /**
   * Get projects by category
   */
  getProjectsByCategory: async (
    category: string
  ): Promise<ProjectResponse[]> => {
    const response = await apiClient.get(
      API_ENDPOINTS.PROJECTS.BY_CATEGORY(category)
    );
    return response.data;
  },

  /**
   * Get donation projects
   */
  getDonationProjects: async (): Promise<ProjectResponse[]> => {
    const response = await apiClient.get(API_ENDPOINTS.PROJECTS.DONATION);
    return response.data;
  },

  /**
   * Create donation project
   */
  createDonationProject: async (
    data: CreateDonationProjectRequest
  ): Promise<ProjectResponse> => {
    const response = await apiClient.post(
      API_ENDPOINTS.PROJECTS.CREATE_DONATION,
      data
    );
    return response.data;
  },

  /**
   * Search projects
   */
  searchProjects: async (keyword: string): Promise<ProjectResponse[]> => {
    const response = await apiClient.get(API_ENDPOINTS.PROJECTS.SEARCH, {
      params: { keyword },
    });
    return response.data;
  },

  /**
   * Upload files to project
   */
  uploadProjectFiles: async (
    projectId: number,
    formData: FormData
  ): Promise<any> => {
    const response = await apiClient.post(
      API_ENDPOINTS.PROJECTS.UPLOAD_FILES(projectId),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },
};
