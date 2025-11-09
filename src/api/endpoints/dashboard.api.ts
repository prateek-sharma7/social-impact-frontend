import apiClient from "../client";
import { API_ENDPOINTS } from "@/utils/constants";
import { VolunteerDashboardResponse } from "@/types/dashboard.types";

/**
 * Dashboard API
 */
export const dashboardAPI = {
  /**
   * Get volunteer dashboard data
   */
  getVolunteerDashboard: async (): Promise<VolunteerDashboardResponse> => {
    const response = await apiClient.get(API_ENDPOINTS.DASHBOARD.VOLUNTEER);
    return response.data;
  },

   /**
   * Get organization dashboard data
   */
  getOrganizationDashboard: async (): Promise<OrganizationDashboardResponse> => {
    const response = await apiClient.get(API_ENDPOINTS.DASHBOARD.ORGANIZATION);
    return response.data;
  },
};
