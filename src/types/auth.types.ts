import { UserRole } from "@/utils/constants";

/**
 * Login Credentials
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Register Data
 */
export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  organizationName?: string;
  phoneNumber?: string;
}

/**
 * Authentication Response
 */
export interface AuthenticationResponse {
  token: string;
  type: string;
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}
