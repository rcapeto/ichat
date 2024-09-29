import { z } from 'zod'
import { getIdSchema } from '~/validation/default'

export const validation = z.object({
  contactId: getIdSchema('id do contato'),
  userId: getIdSchema('id do usuário'),
})
