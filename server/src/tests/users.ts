import { UserRepository } from '~/app/repositories/users'
import {
  FindManyUserRequest,
  FindManyUserResponse,
} from '~/app/repositories/users/types'
import { serverConfig } from '~/config/server'
import { User } from '~/entities/app/User'
import { lowerCase } from '~/utils/strings'

export class TestUserRepository implements UserRepository {
  private users: User[] = []

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

  setNewUser(...users: User[]) {
    this.users.push(...users)
  }

  resetDB() {
    this.users = []
  }
}
