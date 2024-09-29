import { ChatRepository } from '~/app/repositories/chats'
import {
  FindManyChatMessagesRequest,
  FindManyChatMessagesResponse,
} from '~/app/repositories/chats/types'
import { getAPIError } from '~/utils/getApiError'
import { validation } from './validation'

type Request = FindManyChatMessagesRequest
type Response = FindManyChatMessagesResponse

export class FindManyChatMessagesUseCase {
  constructor(private repository: ChatRepository) {}

  async execute(request: Request): Promise<Response> {
    try {
      const { chatId, lastMessageId } = validation.parse(request)

      return await this.repository.findManyChatMessages({
        lastMessageId,
        chatId,
      })
    } catch (err) {
      throw getAPIError(err)
    }
  }
}
