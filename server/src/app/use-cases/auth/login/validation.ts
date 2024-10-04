import { z } from 'zod'
import { getEmailSchema, getStringWithLengthSchema } from '~/validation/default'

export const validation = z.object({
  email: getEmailSchema('email'),
  password: getStringWithLengthSchema('senha', 8),
})
