import { User as DBUser } from '@prisma/client'
import { AuthRepository } from '~/app/repositories/auth'
import { User, UserEntity } from '~/entities/app/User'
import { Messages } from '~/messages'
import {
  dispatchNotFoundError,
  dispatchUnauthorizedError,
} from '~/utils/dispatchError'
import { LoginRequest, LoginResponse } from '../app/repositories/auth/types'

export class TestAuthRepository implements AuthRepository {
  private users: DBUser[] = []

  async login(request: LoginRequest): Promise<LoginResponse> {
    const { email, password } = request
    const dbUser = await this.findUserByEmail(email)
    const user = new UserEntity(dbUser)

    const isSamePassword = user.password === password

    if (!isSamePassword) {
      throw dispatchUnauthorizedError(Messages.EMAIL_OR_PASSWORD_IS_INVALID)
    }

    return { session: user.getSession() }
  }

  async findUserByEmail(email: string) {
    const user = this.users.find((item) => item.email === email)

    if (!user) {
      throw dispatchNotFoundError(Messages.DOES_NOT_FOUND_USER)
    }

    return user
  }

  setNewUser(user: User) {
    this.users.push({
      email: user.email,
      first_name: user.firstName,
      id: user.id,
      last_name: user.lastName,
      password: user.password,
      profile_image: user.profileImage,
    })
  }
}
