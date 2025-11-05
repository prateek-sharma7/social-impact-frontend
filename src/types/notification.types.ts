import { NotificationType, EmailFrequency } from "@/utils/constants";

/**
 * Notification Response
 */
export interface NotificationResponse {
  id: number;
  userId: number;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  relatedEntityId?: number;
  relatedEntityType?: string;
  createdAt: string;
  readAt?: string;
}

/**
 * Notification Preferences Response
 */
export interface NotificationPreferencesResponse {
  id: number;
  userId: number;
  emailEnabled: boolean;
  pushEnabled: boolean;
  emailNotificationTypes: string[];
  pushNotificationTypes: string[];
  emailFrequency: EmailFrequency;
}

/**
 * Notification Preferences Request
 */
export interface NotificationPreferencesRequest {
  emailEnabled?: boolean;
  pushEnabled?: boolean;
  emailNotificationTypes?: string[];
  pushNotificationTypes?: string[];
  emailFrequency?: EmailFrequency;
}
