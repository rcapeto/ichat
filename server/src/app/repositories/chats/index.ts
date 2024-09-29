// eslint-disable-next-line prettier/prettier
import { CreateChatRequest, CreateChatResponse, FindMyChatsRequest, FindMyChatsResponse } from './types';

export abstract class ChatRepository {
  abstract create(request: CreateChatRequest): Promise<CreateChatResponse>
  abstract findMyChats(
    request: FindMyChatsRequest,
  ): Promise<FindMyChatsResponse>
}
