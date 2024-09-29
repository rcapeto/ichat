import { z } from 'zod'
import { getIdSchema } from '~/validation/default'

export const validation = z.object({
  userId: getIdSchema('id do usuário'),
})
