import { z } from 'zod'
import { getStringSchema } from '~/validation/default'

export const validation = z.object({
  action: getStringSchema('action'),
  type: getStringSchema('logger type'),
})
