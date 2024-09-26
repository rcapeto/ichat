import { UserRepository } from '~/app/repositories/users'
import {
  FindManyUserRequest,
  FindManyUserResponse,
  UpdateUserRequest,
  UpdateUserResponse,
} from '~/app/repositories/users/types'
import { serverConfig } from '~/config/server'
import { User } from '~/entities/app/User'
import { ErrorType } from '~/enums/errorType'
import { Status } from '~/enums/status'
import { Messages } from '~/messages'
import { dispatchError, dispatchNotFoundError } from '~/utils/dispatchError'
import { lowerCase } from '~/utils/strings'

export class TestUserRepository implements UserRepository {
  private users: User[] = []

  async update(request: UpdateUserRequest): Promise<UpdateUserResponse> {
    const { userId, email, firstName, profileImage, lastName } = request

    const user = await this.findUserById(userId)

    await Promise.all([this.checkIfExistsUserWithEmail(email)])

    user.email = email || user.email
    user.firstName = firstName || user.firstName
    user.profileImage = profileImage ?? user.profileImage
    user.lastName = lastName || user.lastName

    const userIndex = this.users.findIndex((dbUser) => dbUser.id === user.id)

    if (userIndex !== -1) {
      this.users.splice(userIndex, 0, user)
    }

    return { user }
  }

  async findMany(request: FindManyUserRequest): Promise<FindManyUserResponse> {
    const { query, userId } = request
    const page = Number(request.page)
    const perPage = serverConfig.numberOfDataPerPage
    const lowerCaseQuery = lowerCase(query)

    const users = this.users
      .filter((user) => user.id !== userId)
      .filter((user) => {
        const { firstName, lastName, email } = user

        return (
          lowerCase(firstName).includes(lowerCaseQuery) ||
          lowerCase(lastName).includes(lowerCaseQuery) ||
          lowerCase(email).includes(lowerCaseQuery)
        )
      })

    const start = (page - 1) * perPage
    const end = perPage * page

    const searchUsers = users.slice(start, end)
    const count = users.length

    return {
      count,
      page,
      users: searchUsers,
      totalPages: Math.ceil(count / perPage),
    }
  }

  async checkIfExistsUserWithEmail(email: string) {
    const user = this.users.find((user) => user.email === email)

    if (user) {
      throw dispatchError({
        errorType: ErrorType.UNAUTHORIZED,
        message: Messages.EMAIL_IS_ALREADY_IN_REGISTERED,
        status: Status.UNAUTHORIZED,
      })
    }
  }

  async findUserById(id: string) {
    const user = this.users.find((user) => user.id === id)

    if (!user) {
      throw dispatchNotFoundError(Messages.DOES_NOT_FOUND_USER)
    }

    return user
  }

  setNewUser(...users: User[]) {
    this.users.push(...users)
  }

  resetDB() {
    this.users = []
  }
}
