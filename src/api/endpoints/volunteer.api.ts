import apiClient from "../client";
import { API_ENDPOINTS } from "@/utils/constants";
import {
  VolunteerRegistrationResponse,
  VolunteerRegistrationRequest,
} from "@/types/volunteer.types";
import { PageResponse } from "@/types/common.types";

/**
 * Volunteer API
 */
export const volunteerAPI = {
  /**
   * Get all registrations
   */
  getVolunteerRegistrations: async (): Promise<
    PageResponse<VolunteerRegistrationResponse[]>
  > => {
    const response = await apiClient.get(
      API_ENDPOINTS.VOLUNTEERS.MY_REGISTRATIONS
    );
    return response.data;
  },

  /**
   * Register as a volunteer
   */
  registerAsVolunteer: async (
    data: VolunteerRegistrationRequest,
    id: number
  ): Promise<VolunteerRegistrationResponse> => {
    const user = localStorage.getItem("userId");
    const response = await apiClient.post(
      API_ENDPOINTS.VOLUNTEERS.REGISTER(id),
      data,
      {
        headers: {
          "X-User-Id": user || "",
        },
      }
    );
    return response.data;
  },

  /**
   * Withdraw volunteer application
   */
  withdrawVolunteerApplication: async (id: number): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.VOLUNTEERS.WITHDRAW(id));
  },
};
