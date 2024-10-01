import { AuthRepository } from '~/app/repositories/auth'
import { GetMySessionResponse } from '~/app/repositories/auth/types'
import { TokenService } from '~/services/token'
import { getAPIError } from '~/utils/getApiError'
import { validation } from './validation'

export type Request = { token: string }
type Response = GetMySessionResponse

export class SessionUseCase {
  constructor(private repository: AuthRepository) {}

  async execute(request: Request): Promise<Response> {
    try {
      const { token } = validation.parse(request)
      const userId = TokenService.verifyToken(token)

      return await this.repository.session({ userId })
    } catch (err) {
      throw getAPIError(err)
    }
  }
}
