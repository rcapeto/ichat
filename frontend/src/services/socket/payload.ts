import { Chat, Message } from "@/services/http/requests/app/chat/types";

export type UserOnlineSocketEventParams = {
  userId: string;
};

export type UserDisconnectSocketEventParams = {
  userId: string;
};

export type CreateChatSocketEventResponse = {
  chat: Chat;
};

export type CreateMessageSocketEventResponse = {
  message: Message;
  contactUnreadCount: number;
  ownerUnreadCount: number;
  contactId: string;
};

export type ReadChatMessagesSocketEventResponse = {
  chatId: string;
  userReadMessagesId: string;
};

export type GetOnlineSocketUsersResponse = {
  onlineUsers: string[];
};
