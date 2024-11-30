import { z } from 'zod'
import { getStringSchema } from '~/validation/default'

export const validation = z.object({
  token: getStringSchema('token'),
})
