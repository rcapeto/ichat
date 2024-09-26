import { UserRepository } from '~/app/repositories/users'
import {
  UpdateUserPasswordRequest,
  UpdateUserPasswordResponse,
} from '~/app/repositories/users/types'
import { getAPIError } from '~/utils/getApiError'
import { validation } from './validation'

type Request = UpdateUserPasswordRequest
type Response = UpdateUserPasswordResponse

export class UpdatePasswordUserUseCase {
  constructor(private repository: UserRepository) {}

  async execute(request: Request): Promise<Response> {
    try {
      const { password, newPassword, userId } = validation.parse(request)

      return await this.repository.updatePassword({
        password,
        newPassword,
        userId,
      })
    } catch (err) {
      throw getAPIError(err)
    }
  }
}
