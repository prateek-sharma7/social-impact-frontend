import { UserRole } from "@/utils/constants";

/**
 * User Response
 */
export interface UserResponse {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  bio?: string;
  location?: string;
  phoneNumber?: string;
  profilePictureUrl?: string;
  availability?: string;
  skills?: string[];
  interests?: string[];
  organizationName?: string;
  website?: string;
  organizationType?: string;
  createdAt: string;
}

/**
 * Update Profile Request
 */
export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  bio?: string;
  location?: string;
  phoneNumber?: string;
  skills?: string[];
  profilePictureUrl?: string;
  availability?: string;
  interests?: string[];
  organizationName?: string;
  website?: string;
  organizationType?: string;
}
