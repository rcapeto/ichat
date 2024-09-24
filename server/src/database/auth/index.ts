import { AuthRepository } from '~/app/repositories/auth'
import { LoginRequest, LoginResponse } from '~/app/repositories/auth/types'
import { client } from '~/database/client'
import { UserEntity } from '~/entities/app/User'
import { Messages } from '~/messages'
import {
  dispatchNotFoundError,
  dispatchUnauthorizedError,
} from '~/utils/dispatchError'

export class DatabaseAuthRepository implements AuthRepository {
  async login(request: LoginRequest): Promise<LoginResponse> {
    const { email, password } = request
    const dbUser = await this.findUserByEmail(email)
    const user = new UserEntity(dbUser)

    const isSamePassword = await user.isSamePassword(password)

    if (!isSamePassword) {
      throw dispatchUnauthorizedError(Messages.EMAIL_OR_PASSWORD_IS_INVALID)
    }

    return { session: user.getSession() }
  }

  async findUserByEmail(email: string) {
    const user = await client.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      throw dispatchNotFoundError(Messages.DOES_NOT_FOUND_USER)
    }

    return user
  }
}
