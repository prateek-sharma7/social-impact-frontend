import apiClient from "../client";
import { API_ENDPOINTS } from "@/utils/constants";
import {
  NotificationResponse,
  NotificationPreferencesResponse,
  NotificationPreferencesRequest,
} from "@/types/notification.types";

/**
 * Notifications API
 */
export const notificationsAPI = {
  /**
   * Get user notifications
   */
  getNotifications: async (): Promise<NotificationResponse[]> => {
    const response = await apiClient.get(API_ENDPOINTS.NOTIFICATIONS.LIST);
    return response.data;
  },

  /**
   * Get unread notifications
   */
  getUnreadNotifications: async (): Promise<NotificationResponse[]> => {
    const response = await apiClient.get(API_ENDPOINTS.NOTIFICATIONS.UNREAD);
    return response.data;
  },

  /**
   * Get unread notification count
   */
  getUnreadCount: async (): Promise<number> => {
    const response = await apiClient.get(
      API_ENDPOINTS.NOTIFICATIONS.UNREAD_COUNT
    );
    return response.data;
  },

  /**
   * Mark notification as read
   */
  markAsRead: async (notificationId: number): Promise<void> => {
    await apiClient.put(API_ENDPOINTS.NOTIFICATIONS.MARK_READ(notificationId));
  },

  /**
   * Mark all notifications as read
   */
  markAllAsRead: async (): Promise<void> => {
    await apiClient.put(API_ENDPOINTS.NOTIFICATIONS.MARK_ALL_READ);
  },

  /**
   * Get notification preferences
   */
  getPreferences: async (): Promise<NotificationPreferencesResponse> => {
    const response = await apiClient.get(
      API_ENDPOINTS.NOTIFICATIONS.PREFERENCES
    );
    return response.data;
  },

  /**
   * Update notification preferences
   */
  updatePreferences: async (
    data: NotificationPreferencesRequest
  ): Promise<NotificationPreferencesResponse> => {
    const response = await apiClient.put(
      API_ENDPOINTS.NOTIFICATIONS.UPDATE_PREFERENCES,
      data
    );
    return response.data;
  },
};
