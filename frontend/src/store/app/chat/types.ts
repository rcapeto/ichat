import {
  CreateChatResponse,
  CreateMessageResponse,
  GetChatUsersResponse,
  GetMessagesChatResponse,
  GetMyChatsResponse,
  Message,
  ReadChatMessagesResponse,
  SimpleChat,
} from "@/services/http/requests/app/chat/types";
import { InitialApiState } from "@/store/types";

export type ChatStoreState = {
  requestChats: InitialApiState<GetMyChatsResponse>;
  requestUsers: InitialApiState<GetChatUsersResponse>;
  requestChatMessages: InitialApiState<GetMessagesChatResponse>;
  requestCreateMessage: InitialApiState<CreateMessageResponse>;
  requestCreateChat: InitialApiState<CreateChatResponse>;
  requestReadMessage: InitialApiState<ReadChatMessagesResponse>;
  chats: SimpleChat[];
  totalUnreadMessages: number;
  selectedChat: SimpleChat | null;
};

export type InsertNewMessage = {
  chatId: string;
  messages: Message[];
  isOldMessage?: boolean;
};

export type InsertNewChat = {
  chat: SimpleChat;
};

export type UpdateReadMessages = {
  chatId: string;
  userReadMessagesId: string;
};

export type SelectChat = {
  chat?: SimpleChat | null;
  chatId?: string;
};
