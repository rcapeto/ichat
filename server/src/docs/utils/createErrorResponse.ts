import { ApiSchemas } from '~/docs/types'
import { ApiError } from '~/entities/apiError'
import { Status } from '~/enums/status'
import { Messages } from '~/messages'
import { dispatchValidationError } from '~/utils/dispatchError'

export function createResponseValidationError() {
  return {
    contentSchemaPath: ApiSchemas.ERROR,
    code: Status.BAD_REQUEST,
    content: {
      ok: false,
      data: dispatchValidationError(Messages.FIELDS_VALIDATION_ERROR),
    },
    description: 'Validação dos campos do request.body',
  }
}

export function createResponseError(error: ApiError, description: string) {
  return {
    contentSchemaPath: ApiSchemas.ERROR,
    code: error.status,
    content: {
      ok: false,
      data: error,
    },
    description,
  }
}
