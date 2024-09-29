/* eslint-disable prettier/prettier */
import {
  CreateChatRequest,
  CreateChatResponse,
  FindManyChatMessagesRequest,
  FindManyChatMessagesResponse,
  FindMyChatsRequest,
  FindMyChatsResponse,
  ReadAllChatMessagesRequest,
  ReadAllChatMessagesResponse
} from './types';

export abstract class ChatRepository {
  abstract create(request: CreateChatRequest): Promise<CreateChatResponse>
  abstract findMyChats(
    request: FindMyChatsRequest,
  ): Promise<FindMyChatsResponse>

  abstract readAllMessages(
    request: ReadAllChatMessagesRequest,
  ): Promise<ReadAllChatMessagesResponse>

  abstract findManyChatMessages(
    request: FindManyChatMessagesRequest,
  ): Promise<FindManyChatMessagesResponse>
}
