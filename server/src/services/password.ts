import { compare, hash } from 'bcrypt'

type EncryptPasswordParams = {
  password: string
  buffer?: number
}

type CheckPasswordParams = {
  password: string
  encryptedPassword: string
}

export class PasswordService {
  static async encryptPassword(params: EncryptPasswordParams) {
    const { password, buffer } = Object.assign({ buffer: 10 }, params)
    return await hash(password, buffer)
  }

  static async checkPassword(params: CheckPasswordParams) {
    const { encryptedPassword, password } = params
    return await compare(password, encryptedPassword)
  }
}
