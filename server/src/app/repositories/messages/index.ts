/* eslint-disable prettier/prettier */
import {
  CreateMessageRequest,
  CreateMessageResponse
} from './types';

export abstract class MessageRepository {
  abstract create(request: CreateMessageRequest): Promise<CreateMessageResponse>
}
