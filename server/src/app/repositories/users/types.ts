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

export type UpdateUserRequest = {
  userId: string
  profileImage?: string | null
  firstName?: string | null
  lastName?: string | null
  email?: string | null
}

export type UpdateUserResponse = {
  user: UserSession
}

export type UpdateUserPasswordRequest = {
  newPassword: string
  password: string
  userId: string
}

export type UpdateUserPasswordResponse = void
