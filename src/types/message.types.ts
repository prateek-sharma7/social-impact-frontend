import { MessageType, MessageStatus } from "@/utils/constants";

/**
 * Message Response
 */
export interface MessageResponse {
  id: number;
  senderId: number;
  senderName: string;
  receiverId: number;
  receiverName: string;
  content: string;
  messageType: MessageType;
  status: MessageStatus;
  projectId?: number;
  projectTitle?: string;
  sentAt: string;
  readAt?: string;
  myMessage: boolean;
}

/**
 * Send Message Request
 */
export interface SendMessageRequest {
  receiverId: number;
  content: string;
  projectId?: number;
  messageType?: MessageType;
}

/**
 * Conversation Preview
 */
export interface ConversationPreview {
  userId: number;
  userName: string;
  userProfilePicture?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}
