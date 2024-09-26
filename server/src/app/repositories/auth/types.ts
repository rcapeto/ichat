import { UserSession } from '~/entities/app/User'

export type LoginRequest = {
  email: string
  password: string
}

export type LoginResponse = {
  session: UserSession
}

export type RegisterRequest = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

export type RegisterResponse = void
