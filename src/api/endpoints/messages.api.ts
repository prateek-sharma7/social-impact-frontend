import apiClient from "../client";
import { API_ENDPOINTS } from "@/utils/constants";
import {
  MessageResponse,
  SendMessageRequest,
  ConversationPreview,
} from "@/types/message.types";

/**
 * Messages API
 */
export const messagesAPI = {
  /**
   * Send a message
   */
  sendMessage: async (data: SendMessageRequest): Promise<MessageResponse> => {
    const response = await apiClient.post(API_ENDPOINTS.MESSAGES.SEND, data);
    return response.data;
  },

  /**
   * Get user conversations
   */
  getConversations: async (): Promise<ConversationPreview[]> => {
    const response = await apiClient.get(API_ENDPOINTS.MESSAGES.CONVERSATIONS);
    return response.data;
  },

  /**
   * Get conversation with specific user
   */
  getConversation: async (otherUserId: number): Promise<MessageResponse[]> => {
    const response = await apiClient.get(
      API_ENDPOINTS.MESSAGES.CONVERSATION(otherUserId)
    );
    return response.data;
  },

  /**
   * Mark messages as read
   */
  markAsRead: async (senderId: number): Promise<void> => {
    await apiClient.put(API_ENDPOINTS.MESSAGES.MARK_READ(senderId));
  },

  /**
   * Get unread message count
   */
  getUnreadCount: async (): Promise<number> => {
    const response = await apiClient.get(API_ENDPOINTS.MESSAGES.UNREAD_COUNT);
    return response.data;
  },
};
