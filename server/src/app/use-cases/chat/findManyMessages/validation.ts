import { z } from 'zod'
import { getIdSchema } from '~/validation/default'

export const validation = z.object({
  lastMessageId: getIdSchema('id da última mensagem'),
  chatId: getIdSchema('id do chat'),
})
