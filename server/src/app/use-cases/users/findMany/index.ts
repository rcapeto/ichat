import { UserRepository } from '~/app/repositories/users'
import {
  FindManyUserRequest,
  FindManyUserResponse,
} from '~/app/repositories/users/types'
import { getAPIError } from '~/utils/getApiError'
import { validation } from './validation'

type Request = FindManyUserRequest
type Response = FindManyUserResponse

export class FindManyUsersUseCase {
  constructor(private repository: UserRepository) {}

  async execute(request: Request): Promise<Response> {
    try {
      const params = {
        userId: request.userId,
        page: Number(request.page) || 1,
        query: request.query || '',
      }
      const { userId, page, query } = validation.parse(params)

      return await this.repository.findMany({
        userId,
        page,
        query,
      })
    } catch (err) {
      throw getAPIError(err)
    }
  }
}
