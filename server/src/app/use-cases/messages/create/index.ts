import { MessageRepository } from '~/app/repositories/messages'
import {
  CreateMessageRequest,
  CreateMessageResponse,
} from '~/app/repositories/messages/types'
import { getAPIError } from '~/utils/getApiError'
import { validation } from './validation'

type Request = CreateMessageRequest
type Response = CreateMessageResponse

export class CreateMessageUseCase {
  constructor(private repository: MessageRepository) {}

  async execute(request: Request): Promise<Response> {
    try {
      const { chatId, content, file, userId } = validation.parse(request)

      return await this.repository.create({
        chatId,
        content,
        userId,
        file,
      })
    } catch (err) {
      throw getAPIError(err)
    }
  }
}
