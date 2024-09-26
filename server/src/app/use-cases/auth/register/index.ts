import { AuthRepository } from '~/app/repositories/auth'
import {
  RegisterRequest,
  RegisterResponse,
} from '~/app/repositories/auth/types'
import { getAPIError } from '~/utils/getApiError'
import { validation } from './validation'

type Request = RegisterRequest
type Response = RegisterResponse

export class RegisterUseCase {
  constructor(private repository: AuthRepository) {}

  async execute(request: Request): Promise<Response> {
    try {
      const { confirmPassword, email, firstName, lastName, password } =
        validation.parse(request)

      return await this.repository.register({
        confirmPassword,
        email,
        firstName,
        lastName,
        password,
      })
    } catch (err) {
      throw getAPIError(err)
    }
  }
}
