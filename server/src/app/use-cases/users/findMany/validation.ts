import { z } from 'zod'
import {
  getIdSchema,
  getOptionalNumberSchema,
  getOptionalStringSchema,
} from '~/validation/default'

export const validation = z.object({
  userId: getIdSchema('userId'),
  page: getOptionalNumberSchema(1),
  query: getOptionalStringSchema(),
})
