import { ChatRepository } from '~/app/repositories/chats'
import {
  CreateChatRequest,
  CreateChatResponse,
} from '~/app/repositories/chats/types'
import { getAPIError } from '~/utils/getApiError'
import { validation } from './validation'

type Request = CreateChatRequest
type Response = CreateChatResponse

export class CreateChatUseCase {
  constructor(private repository: ChatRepository) {}

  async execute(request: Request): Promise<Response> {
    try {
      const { contactId, userId } = validation.parse(request)

      return await this.repository.create({
        contactId,
        userId,
      })
    } catch (err) {
      throw getAPIError(err)
    }
  }
}
