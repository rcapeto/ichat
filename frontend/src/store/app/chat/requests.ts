import {
  createChat,
  createMessage,
  getMessagesChat,
  getMyChats,
  getUsersChat,
  readChatMessages,
} from "@/services/http/requests/app/chat/requests";
import {
  CreateChatRequest,
  CreateChatResponse,
  CreateMessageRequest,
  CreateMessageResponse,
  GetChatUsersRequest,
  GetChatUsersResponse,
  GetMessagesChatRequest,
  GetMessagesChatResponse,
  GetMyChatsResponse,
  ReadChatMessagesRequest,
  ReadChatMessagesResponse,
} from "@/services/http/requests/app/chat/types";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const handleCreateChat = createAsyncThunk<
  CreateChatResponse,
  CreateChatRequest
>("create-chat", async (params) => {
  try {
    const response = await createChat(params);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data?.message || error?.message;
    }

    if (error instanceof Error) {
      throw error.message;
    }

    throw error;
  }
});

export const handleCreateMessage = createAsyncThunk<
  CreateMessageResponse,
  CreateMessageRequest
>("create-message", async (params) => {
  try {
    const response = await createMessage(params);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data?.message || error?.message;
    }

    if (error instanceof Error) {
      throw error.message;
    }

    throw error;
  }
});

export const handleGetMessagesChat = createAsyncThunk<
  GetMessagesChatResponse,
  GetMessagesChatRequest
>("get-chat-messages", async (params) => {
  try {
    const response = await getMessagesChat(params);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data?.message || error?.message;
    }

    if (error instanceof Error) {
      throw error.message;
    }

    throw error;
  }
});

export const handleGetMyChats = createAsyncThunk<GetMyChatsResponse>(
  "get-my-chats",
  async () => {
    try {
      const response = await getMyChats();
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error.response?.data?.message ?? "";
      }

      if (error instanceof Error) {
        throw error.message;
      }

      throw error;
    }
  }
);

export const handleGetUsersChat = createAsyncThunk<
  GetChatUsersResponse,
  GetChatUsersRequest
>("get-users-chats", async (params) => {
  try {
    const response = await getUsersChat(params);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data?.message || error?.message;
    }

    if (error instanceof Error) {
      throw error.message;
    }

    throw error;
  }
});

export const handleReadChatMessages = createAsyncThunk<
  ReadChatMessagesResponse,
  ReadChatMessagesRequest
>("read-chats-messages", async (params) => {
  try {
    const response = await readChatMessages(params);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data?.message || error?.message;
    }

    if (error instanceof Error) {
      throw error.message;
    }

    throw error;
  }
});
