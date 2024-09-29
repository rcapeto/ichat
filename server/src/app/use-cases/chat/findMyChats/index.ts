import { ChatRepository } from '~/app/repositories/chats'
import {
  FindMyChatsRequest,
  FindMyChatsResponse,
} from '~/app/repositories/chats/types'
import { getAPIError } from '~/utils/getApiError'
import { validation } from './validation'

type Request = FindMyChatsRequest
type Response = FindMyChatsResponse

export class FindMyChatsUseCase {
  constructor(private repository: ChatRepository) {}

  async execute(request: Request): Promise<Response> {
    try {
      const { userId } = validation.parse(request)

      return await this.repository.findMyChats({
        userId,
      })
    } catch (err) {
      throw getAPIError(err)
    }
  }
}
