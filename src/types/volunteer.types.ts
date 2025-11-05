import { ApplicationStatus } from "@/utils/constants";

/**
 * Volunteer Registration Response
 */
export interface VolunteerRegistrationResponse {
  id: number;
  projectId: number;
  projectTitle: string;
  volunteerId: number;
  volunteerName: string;
  volunteerEmail: string;
  status: ApplicationStatus;
  motivation: string;
  registrationDate: string;
  approvalDate?: string;
}

/**
 * Volunteer Registration Request
 */
export interface VolunteerRegistrationRequest {
  motivation: string;
}

/**
 * Volunteer Application Response (for organizations)
 */
export interface VolunteerApplicationResponse {
  volunteerId: number;
  volunteerName: string;
  volunteerEmail: string;
  projectId: number;
  projectTitle: string;
  status: ApplicationStatus;
  appliedAt: string;
}
