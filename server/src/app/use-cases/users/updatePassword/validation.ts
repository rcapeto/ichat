import { z } from 'zod'
import { getIdSchema, getPasswordSchema } from '~/validation/default'

export const validation = z.object({
  newPassword: getPasswordSchema('nova senha'),
  password: getPasswordSchema('senha'),
  userId: getIdSchema('id do usuário'),
})
