import { ErrorType } from '~/enums/errorType'
import { Status } from '~/enums/status'
import { Messages } from '~/messages'

export type InitializeApiError = {
  message?: string
  status?: Status
  errorType?: ErrorType
}

export class ApiError {
  message: string
  status: Status
  errorType: ErrorType

  constructor({
    message = Messages.SERVER_DEFAULT_ERROR,
    errorType = ErrorType.INTERNAL_SERVER_ERROR,
    status = Status.INTERNAL_SERVER_ERROR,
  }: InitializeApiError) {
    this.errorType = errorType
    this.message = message
    this.status = status
  }
}
