import apiClient from "../client";
import { API_ENDPOINTS } from "@/utils/constants";

import {
  VolunteerAnalyticsResponse,
  OrganizationAnalyticsResponse,
} from "@/types/analytics.types";

/**
 * Analytics API
 */
export const analyticsAPI = {
  /**
   * Get analytics for the currently logged-in volunteer
   */
  getVolunteerAnalytics: async (): Promise<VolunteerAnalyticsResponse> => {
    const response = await apiClient.get(API_ENDPOINTS.ANALYTICS.VOLUNTEER);
    return response.data;
  },

  /**
   * Get analytics for a specific volunteer (admin or authorized access)
   */
  getVolunteerAnalyticsById: async (
    volunteerId: number
  ): Promise<VolunteerAnalyticsResponse> => {
    const response = await apiClient.get(
      API_ENDPOINTS.ANALYTICS.VOLUNTEER_BY_ID(volunteerId)
    );
    return response.data;
  },

  /**
   * Get overall platform-wide analytics
   */
  getPlatformAnalytics: async (): Promise<any> => {
    const response = await apiClient.get(API_ENDPOINTS.ANALYTICS.PLATFORM);
    return response.data;
  },

  /**
   * Get analytics for the currently logged-in organization
   */
  getOrganizationAnalytics:
    async (): Promise<OrganizationAnalyticsResponse> => {
      const response = await apiClient.get(
        API_ENDPOINTS.ANALYTICS.ORGANIZATION
      );
      return response.data;
    },

  /**
   * Get analytics for a specific organization (admin access)
   */
  getOrganizationAnalyticsById: async (
    orgId: number
  ): Promise<OrganizationAnalyticsResponse> => {
    const response = await apiClient.get(
      API_ENDPOINTS.ANALYTICS.ORGANIZATION_BY_ID(orgId)
    );
    return response.data;
  },
};
