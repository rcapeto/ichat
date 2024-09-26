import { UserRepository } from '~/app/repositories/users'
import {
  UpdateUserRequest,
  UpdateUserResponse,
} from '~/app/repositories/users/types'
import { getAPIError } from '~/utils/getApiError'
import { validation } from './validation'

type Request = UpdateUserRequest
type Response = UpdateUserResponse

export class UpdateUserUseCase {
  constructor(private repository: UserRepository) {}

  async execute(request: Request): Promise<Response> {
    try {
      const { email, firstName, profileImage, lastName, userId } =
        validation.parse(
          Object.assign(request, { email: request.email || null }),
        )

      const { user } = await this.repository.update({
        userId,
        email: email || '',
        firstName,
        profileImage,
        lastName,
      })

      return { user }
    } catch (err) {
      throw getAPIError(err)
    }
  }
}
