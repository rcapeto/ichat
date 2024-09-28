import { UserRepository } from '~/app/repositories/users'
import {
  FindManyUserRequest,
  FindManyUserResponse,
  UpdateUserPasswordRequest,
  UpdateUserPasswordResponse,
  UpdateUserRequest,
  UpdateUserResponse,
} from '~/app/repositories/users/types'
import { serverConfig } from '~/config/server'
import { client } from '~/database/client'
import { UserEntity } from '~/entities/app/User'
import { ErrorType } from '~/enums/errorType'
import { Status } from '~/enums/status'
import { Messages } from '~/messages'
import { PasswordService } from '~/services/password'
import { dispatchError, dispatchNotFoundError } from '~/utils/dispatchError'
import { lowerCase } from '~/utils/strings'

export class DatabaseUserRepository implements UserRepository {
  async updatePassword(
    request: UpdateUserPasswordRequest,
  ): Promise<UpdateUserPasswordResponse> {
    const { newPassword, userId, password } = request

    const dbUser = await this.findUserById(userId)
    const user = new UserEntity(dbUser)

    const [isSamePassword, isSameUserPassword] = await Promise.all([
      user.isSamePassword(newPassword),
      user.isSamePassword(password),
    ])

    if (!isSameUserPassword) {
      throw dispatchError({
        errorType: ErrorType.ERROR,
        message: Messages.CHANGE_PASSWORD_MUST_KNOW_OLD,
        status: Status.BAD_REQUEST,
      })
    }

    if (isSamePassword) {
      throw dispatchError({
        errorType: ErrorType.ERROR,
        message: Messages.CHANGE_PASSWORD_ERROR,
        status: Status.BAD_REQUEST,
      })
    }

    const encryptedPassword = await PasswordService.encryptPassword({
      password: newPassword,
    })

    await client.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: encryptedPassword,
      },
    })
  }

  async update(request: UpdateUserRequest): Promise<UpdateUserResponse> {
    const { userId, email, firstName, profileImage, lastName } = request

    const user = await this.findUserById(userId)

    await Promise.all([this.checkIfExistsUserWithEmail(email)])

    const updatedUser = await client.user.update({
      where: {
        id: user.id,
      },
      data: {
        email: email || user.email,
        first_name: firstName || user.first_name,
        profile_image: profileImage ?? user.profile_image,
        last_name: lastName || user.last_name,
      },
    })

    return {
      user: new UserEntity(updatedUser).getSession(),
    }
  }

  async findMany(request: FindManyUserRequest): Promise<FindManyUserResponse> {
    const { userId, query } = request
    const page = Number(request.page)
    const lowerCaseQuery = lowerCase(query)
    const perPage = serverConfig.numberOfDataPerPage

    const users = await client.user.findMany({
      where: {
        OR: [
          {
            first_name: {
              contains: lowerCaseQuery,
            },
          },
          {
            last_name: {
              contains: lowerCaseQuery,
            },
          },
          {
            email: {
              contains: lowerCaseQuery,
            },
          },
        ],
        NOT: {
          id: {
            equals: userId,
          },
        },
      },
      take: perPage,
      skip: (page - 1) * perPage,
    })

    const count = await this.count(query, userId)

    return {
      count,
      page,
      totalPages: Math.ceil(count / perPage),
      users: users.map((user) => new UserEntity(user).getSession()),
    }
  }

  async count(query: string, userId: string) {
    const lowerCaseQuery = lowerCase(query)

    return await client.user.count({
      where: {
        OR: [
          {
            first_name: {
              contains: lowerCaseQuery,
            },
          },
          {
            last_name: {
              contains: lowerCaseQuery,
            },
          },
          {
            email: {
              contains: lowerCaseQuery,
            },
          },
        ],
        NOT: {
          id: {
            equals: userId,
          },
        },
      },
    })
  }

  async checkIfExistsUserWithEmail(email: string) {
    const user = await client.user.findUnique({
      where: {
        email,
      },
    })

    if (user) {
      throw dispatchError({
        errorType: ErrorType.UNAUTHORIZED,
        message: Messages.EMAIL_IS_ALREADY_IN_REGISTERED,
        status: Status.UNAUTHORIZED,
      })
    }
  }

  async findUserById(id: string) {
    const user = await client.user.findUnique({
      where: {
        id,
      },
    })

    if (!user) {
      throw dispatchNotFoundError(Messages.DOES_NOT_FOUND_USER)
    }

    return user
  }
}
