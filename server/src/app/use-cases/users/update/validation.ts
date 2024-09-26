import { z } from 'zod'
import {
  getEmailSchema,
  getIdSchema,
  getOptionalStringSchema,
} from '~/validation/default'

export const validation = z.object({
  userId: getIdSchema('id do usuário'),
  profileImage: getOptionalStringSchema(),
  firstName: getOptionalStringSchema(),
  lastName: getOptionalStringSchema(),
  email: getEmailSchema('email').nullable(),
})
