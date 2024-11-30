import { AuthRepository } from '~/app/repositories/auth'
import { PrismaUserEntity } from '~/entities/app/PrismaEntities'
import { User, UserEntity } from '~/entities/app/User'
import { ErrorType } from '~/enums/errorType'
import { Status } from '~/enums/status'
import { Messages } from '~/messages'
import {
  dispatchError,
  dispatchNotFoundError,
  dispatchUnauthorizedError,
} from '~/utils/dispatchError'
import {
  GetMySessionRequest,
  GetMySessionResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '../app/repositories/auth/types'
import { makeUser } from './utils'

export class TestAuthRepository implements AuthRepository {
  private users: PrismaUserEntity[] = []

  async session(request: GetMySessionRequest): Promise<GetMySessionResponse> {
    const { userId } = request
    const user = await this.findUserById(userId)
    const session = new UserEntity(user).getSession()

    return { session }
  }

  async register(request: RegisterRequest): Promise<RegisterResponse> {
    const { email, firstName, lastName, password } = request

    await Promise.all([this.checkIfUserExistsByEmail(email)])

    this.setNewUser(makeUser({ email, firstName, lastName, password }))
  }

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

  async checkIfUserExistsByEmail(email: string) {
    const user = this.users.find((item) => item.email === email)

    if (user) {
      throw dispatchError({
        errorType: ErrorType.ERROR,
        message: Messages.EMAIL_IS_ALREADY_IN_REGISTERED,
        status: Status.BAD_REQUEST,
      })
    }
  }

  async findUserByEmail(email: string) {
    const user = this.users.find((item) => item.email === email)

    if (!user) {
      throw dispatchNotFoundError(Messages.DOES_NOT_FOUND_USER)
    }

    return user
  }

  async findUserById(id: string) {
    const user = this.users.find((item) => item.id === id)

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
      created_at: new Date(user.createdAt),
    })
  }

  resetDB() {
    this.users = []
  }

  get count() {
    return this.users.length
  }
}
