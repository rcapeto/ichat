import { AuthRepository } from '~/app/repositories/auth'
import { LoginRequest, LoginResponse } from '~/app/repositories/auth/types'
import { TokenService } from '~/services/token'
import { getAPIError } from '~/utils/getApiError'
import { validation } from './validation'

type Request = LoginRequest

export type Response = LoginResponse & {
  token: string
}

export class LoginUseCase {
  constructor(private repository: AuthRepository) {}

  async execute(request: Request): Promise<Response> {
    try {
      const { email, password } = validation.parse(request)

      const { session } = await this.repository.login({ email, password })
      const token = TokenService.createToken({ subject: session.id })

      return { session, token }
    } catch (err) {
      throw getAPIError(err)
    }
  }
}
