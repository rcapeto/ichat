/* eslint-disable prettier/prettier */
import {
  CreateChatRequest,
  CreateChatResponse,
  FindMyChatsRequest,
  FindMyChatsResponse,
  ReadAllChatMessagesRequest,
  ReadAllChatMessagesResponse,
} from './types';

export abstract class ChatRepository {
  abstract create(request: CreateChatRequest): Promise<CreateChatResponse>
  abstract findMyChats(
    request: FindMyChatsRequest,
  ): Promise<FindMyChatsResponse>

  abstract readAllMessages(
    request: ReadAllChatMessagesRequest,
  ): Promise<ReadAllChatMessagesResponse>
}
