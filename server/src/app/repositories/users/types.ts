import { UserSession } from '~/entities/app/User'

export type FindManyUserRequest = {
  query?: string
  userId: string
  page?: number | string
}

export type FindManyUserResponse = {
  count: number
  users: UserSession[]
  page: number
  totalPages: number
}
