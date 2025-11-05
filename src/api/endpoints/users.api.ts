import apiClient from "../client";
import { API_ENDPOINTS } from "@/utils/constants";
import { UserResponse, UpdateProfileRequest } from "@/types/user.types";

/**
 * Users API
 */
export const usersAPI = {
  /**
   * Get current user profile
   */
  getMe: async (): Promise<UserResponse> => {
    const response = await apiClient.get(API_ENDPOINTS.USERS.ME);
    return response.data;
  },

  /**
   * Get user by ID
   */
  getUserById: async (id: number): Promise<UserResponse> => {
    const response = await apiClient.get(API_ENDPOINTS.USERS.BY_ID(id));
    return response.data;
  },

  /**
   * Get user by email
   */
  getUserByEmail: async (email: string): Promise<UserResponse> => {
    const response = await apiClient.get(API_ENDPOINTS.USERS.BY_EMAIL(email));
    return response.data;
  },

  /**
   * Update user profile
   */
  updateProfile: async (data: UpdateProfileRequest): Promise<UserResponse> => {
    const response = await apiClient.put(
      API_ENDPOINTS.USERS.UPDATE_PROFILE,
      data
    );
    return response.data;
  },
};
