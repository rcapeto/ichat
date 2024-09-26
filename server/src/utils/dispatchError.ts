import { ApiError, InitializeApiError } from '~/entities/apiError'
import { ErrorType } from '~/enums/errorType'
import { Status } from '~/enums/status'
import { Messages } from '~/messages'

export function dispatchError(params: InitializeApiError) {
  return new ApiError(params)
}

export function dispatchRequiredAuthorizationError() {
  return dispatchError({
    message: Messages.UNAUTHORIZED_TOKEN,
    errorType: ErrorType.REQUIRED_AUTHORIZATION,
    status: Status.FORBIDDEN,
  })
}

export function dispatchValidationError(message: string) {
  return dispatchError({
    message,
    errorType: ErrorType.VALIDATION,
    status: Status.BAD_REQUEST,
  })
}

export function dispatchNotFoundError(message: string) {
  return dispatchError({
    message,
    errorType: ErrorType.NOT_FOUND,
    status: Status.NOT_FOUND,
  })
}

export function dispatchUnauthorizedError(message: string) {
  return dispatchError({
    message,
    errorType: ErrorType.UNAUTHORIZED,
    status: Status.UNAUTHORIZED,
  })
}
