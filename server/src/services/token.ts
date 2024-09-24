import { verify, sign } from 'jsonwebtoken'

import { serverConfig } from '~/config/server'

type CreateTokenParams = {
  subject: string
  expires?: string | number
}

export class TokenService {
  static createToken(params: CreateTokenParams) {
    const secretKey = serverConfig.tokenSecretKet
    const { subject, expires } = Object.assign({ expires: '7d' }, params)

    const token = sign({ type: 'token' }, secretKey, {
      subject,
      expiresIn: expires,
    })

    return token
  }

  static verifyToken(token: string) {
    const secretKey = serverConfig.tokenSecretKet

    try {
      const { sub } = verify(token, secretKey)
      return sub as string
    } catch (err) {
      return ''
    }
  }
}
