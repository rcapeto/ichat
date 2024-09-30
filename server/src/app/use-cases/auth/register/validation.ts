import { z } from 'zod'
import { Messages } from '~/messages'
import {
  getEmailSchema,
  getPasswordSchema,
  getStringSchema,
} from '~/validation/default'

export const validation = z
  .object({
    email: getEmailSchema('email'),
    password: getPasswordSchema('senha'),
    confirmPassword: getPasswordSchema('confirmação de senha'),
    firstName: getStringSchema('primeiro nome'),
    lastName: getStringSchema('último nome'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: Messages.PASSWORD_MISS_MATCH,
    path: ['confirmPassword'],
  })
