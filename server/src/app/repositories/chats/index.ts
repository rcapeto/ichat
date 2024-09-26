// eslint-disable-next-line prettier/prettier
import { CreateChatRequest, CreateChatResponse } from './types';

export abstract class ChatRepository {
  abstract create(request: CreateChatRequest): Promise<CreateChatResponse>
}
