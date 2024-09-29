import { ChatRepository } from '~/app/repositories/chats'
import {
  ReadAllChatMessagesRequest,
  ReadAllChatMessagesResponse,
} from '~/app/repositories/chats/types'
import { getAPIError } from '~/utils/getApiError'
import { validation } from './validation'

type Request = ReadAllChatMessagesRequest
type Response = ReadAllChatMessagesResponse

export class ReadAllChatMessagesUseCase {
  constructor(private repository: ChatRepository) {}

  async execute(request: Request): Promise<Response> {
    try {
      const { chatId, userId } = validation.parse(request)

      return await this.repository.readAllMessages({
        userId,
        chatId,
      })
    } catch (err) {
      throw getAPIError(err)
    }
  }
}
