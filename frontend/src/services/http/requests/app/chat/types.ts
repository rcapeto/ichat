import { UserSession } from "@/services/http/entities/app/auth";

export type Message = {
  id: string;
  createdAt: string;
  content: string;
  fileUrl: string | null;
  chatId: string | null;
  read: boolean;
  owner: UserSession;
  ownerId: string;
};

export type ChatUser = UserSession;

export type Chat = {
  id: string;
  createdAt: string;
  updatedAt: string;
  messages: Message[];
  owner: UserSession;
  ownerId: string;
  contact: UserSession;
  contactId: string;
  ownerUnreadCount: number;
  contactUnreadCount: number;
};

export type SimpleChat = {
  name: string;
  id: string;
  avatar: string;
  notification: number;
  messages: Message[];
  updatedAt: string;
  chatUserId: string
  createdAt: string,
};

/** Obter usuários para o chat */
export type GetChatUsersRequest = {
  page: string | number;
  search: string;
};

export type GetChatUsersResponse = {
  count: number;
  page: number;
  totalPages: number;
  users: UserSession[];
};

/** Criar um chat */
export type CreateChatRequest = {
  contactId: string;
};

export type CreateChatResponse = {
  chat: Chat;
};

/** Obter meus chats */
export type GetMyChatsRequest = void;

export type GetMyChatsResponse = {
  chats: SimpleChat[];
};

/** Ler mensagens do chat */
export type ReadChatMessagesRequest = {
  chatId: string;
};

export type ReadChatMessagesResponse = {};

/** Get Messages Chat */
export type GetMessagesChatRequest = {
  chatId: string;
  lastMessageId: string;
};

export type GetMessagesChatResponse = {
  messages: Message[];
  lastPage: boolean;
};

/** Criar uma mensagem */
export type CreateMessageRequest = {
  chatId: string;
  content: string;
  file: string;
};

export type CreateMessageResponse = {
  contactId: string;
  message: Message;
  ownerUnreadCount: number;
  contactUnreadCount: number;
};
