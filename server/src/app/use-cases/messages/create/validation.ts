import { z } from 'zod'
import {
  getIdSchema,
  getOptionalStringSchema,
  getStringSchema,
} from '~/validation/default'

export const validation = z.object({
  userId: getIdSchema('id do usuário'),
  file: getOptionalStringSchema(),
  content: getStringSchema('conteúdo da mensagem'),
  chatId: getIdSchema('id do chat'),
})
