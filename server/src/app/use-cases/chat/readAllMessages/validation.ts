import { z } from 'zod'
import { getIdSchema } from '~/validation/default'

export const validation = z.object({
  chatId: getIdSchema('id do chat'),
  userId: getIdSchema('id do usuário'),
})
