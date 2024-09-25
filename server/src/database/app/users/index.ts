import { UserRepository } from '~/app/repositories/users'
import {
  FindManyUserRequest,
  FindManyUserResponse,
} from '~/app/repositories/users/types'
import { serverConfig } from '~/config/server'
import { client } from '~/database/client'
import { UserEntity } from '~/entities/app/User'
import { lowerCase } from '~/utils/strings'

export class DatabaseUserRepository implements UserRepository {
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

    console.log('@@@ users', { users })

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
}
