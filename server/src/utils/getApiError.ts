import { ZodError } from 'zod'

import { Messages } from '~/messages'
import { logger } from '~/services/logger'
import { ApiError } from '~/entities/apiError'
import { ErrorType } from '~/enums/errorType'
import { Status } from '~/enums/status'
import { dispatchError, dispatchValidationError } from './dispatchError'

export function getAPIError(error: unknown) {
  if (error instanceof ZodError) {
    const errorMessage = error.issues.map((issue) => issue.message).join(', ')

    return dispatchValidationError(errorMessage)
  }

  if (error instanceof ApiError) {
    return error
  }

  if (error instanceof Error) {
    logger({ message: error.message, type: 'error' })
  }

  const errorMessage = Messages.SERVER_DEFAULT_ERROR
  const errorType = ErrorType.INTERNAL_SERVER_ERROR
  const status = Status.INTERNAL_SERVER_ERROR

  return dispatchError({ message: errorMessage, errorType, status })
}
