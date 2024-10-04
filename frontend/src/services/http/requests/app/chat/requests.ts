import { endpoints } from "@/services/http/endpoints";
import { createApiRequest } from "@/services/http/requests/create-api-request";
import {
  CreateChatRequest,
  CreateChatResponse,
  CreateMessageRequest,
  CreateMessageResponse,
  GetChatUsersRequest,
  GetChatUsersResponse,
  GetMessagesChatRequest,
  GetMessagesChatResponse,
  GetMyChatsRequest,
  GetMyChatsResponse,
  ReadChatMessagesRequest,
  ReadChatMessagesResponse,
} from "./types";

const endpointUser = endpoints.app.user;
const endpointChat = endpoints.app.chat;
const endpointMessage = endpoints.app.message;

export async function getUsersChat({ page, search }: GetChatUsersRequest) {
  return await createApiRequest<GetChatUsersRequest, GetChatUsersResponse>({
    endpoint: endpointUser.findMany,
    method: "get",
    requestConfig: {
      params: {
        page,
        search,
      },
    },
  });
}

export async function createChat(payload: CreateChatRequest) {
  return await createApiRequest<CreateChatRequest, CreateChatResponse>({
    endpoint: endpointChat.create,
    method: "post",
    body: payload,
  });
}

export async function getMessagesChat({
  chatId,
  lastMessageId,
}: GetMessagesChatRequest) {
  const endpoint = endpointChat.findManyMessages
    .replace(":chatId", chatId)
    .replace(":lastMessageId", lastMessageId);

  return await createApiRequest<
    GetMessagesChatRequest,
    GetMessagesChatResponse
  >({
    endpoint,
    method: "get",
  });
}

export async function getMyChats() {
  const endpoint = endpointChat.myChats;

  return await createApiRequest<GetMyChatsRequest, GetMyChatsResponse>({
    endpoint,
    method: "get",
  });
}

export async function readChatMessages(payload: ReadChatMessagesRequest) {
  const endpoint = endpointChat.readMessages;

  return await createApiRequest<
    ReadChatMessagesRequest,
    ReadChatMessagesResponse
  >({
    endpoint,
    method: "put",
    body: payload,
  });
}

export async function createMessage(payload: CreateMessageRequest) {
  return await createApiRequest<CreateMessageRequest, CreateMessageResponse>({
    endpoint: endpointMessage.create,
    method: "post",
    body: payload,
  });
}
