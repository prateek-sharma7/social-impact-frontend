import apiClient from "../client";
import { API_ENDPOINTS } from "@/utils/constants";
import {
  LoginCredentials,
  RegisterData,
  AuthenticationResponse,
} from "@/types/auth.types";

/**
 * Authentication API
 */
export const authAPI = {
  /**
   * User login
   */
  login: async (
    credentials: LoginCredentials
  ): Promise<AuthenticationResponse> => {
    const response = await apiClient.post(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    return response.data;
  },

  /**
   * User registration
   */
  register: async (data: RegisterData): Promise<AuthenticationResponse> => {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, data);
    return response.data;
  },

  /**
   * Forgot password
   */
  forgotPassword: async (email: string): Promise<void> => {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, {
      email,
    });
    return response.data;
  },

  /**
   * Reset password
   */
  resetPassword: async (token: string, newPassword: string): Promise<void> => {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
      token,
      newPassword,
    });
    return response.data;
  },
};
