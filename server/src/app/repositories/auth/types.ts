import { UserSession } from '~/entities/app/User'

export type LoginRequest = {
  email: string
  password: string
}

export type LoginResponse = {
  session: UserSession
}
