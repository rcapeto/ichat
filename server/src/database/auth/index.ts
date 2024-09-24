import { AuthRepository } from '~/app/repositories/auth'
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '~/app/repositories/auth/types'
import { client } from '~/database/client'
import { UserEntity } from '~/entities/app/User'
import { ErrorType } from '~/enums/errorType'
import { Status } from '~/enums/status'
import { Messages } from '~/messages'
import { PasswordService } from '~/services/password'
import { dispatchError, dispatchNotFoundError } from '~/utils/dispatchError'

export class DatabaseAuthRepository implements AuthRepository {
  async register(request: RegisterRequest): Promise<RegisterResponse> {
    const { email, firstName, lastName, password } = request

    await Promise.all([this.checkIfUserExistsByEmail(email)])

    const encryptedPassword = await PasswordService.encryptPassword({
      password,
    })

    await client.user.create({
      data: {
        email,
        first_name: firstName,
        last_name: lastName,
        password: encryptedPassword,
      },
    })
  }

  async login(request: LoginRequest): Promise<LoginResponse> {
    const { email, password } = request
    const dbUser = await this.findUserByEmail(email)
    const user = new UserEntity(dbUser)

    const isSamePassword = await user.isSamePassword(password)

    if (!isSamePassword) {
      throw dispatchError({
        errorType: ErrorType.ERROR,
        message: Messages.EMAIL_OR_PASSWORD_IS_INVALID,
        status: Status.BAD_REQUEST,
      })
    }

    return { session: user.getSession() }
  }

  async checkIfUserExistsByEmail(email: string) {
    const user = await client.user.findUnique({
      where: {
        email,
      },
    })

    if (user) {
      throw dispatchError({
        errorType: ErrorType.ERROR,
        message: Messages.EMAIL_IS_ALREADY_IN_REGISTERED,
        status: Status.BAD_REQUEST,
      })
    }
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
