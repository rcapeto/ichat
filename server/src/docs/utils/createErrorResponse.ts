import { ApiSchemas } from '~/docs/types'
import { ApiError } from '~/entities/apiError'
import { Messages } from '~/messages'
import {
  dispatchRequiredAuthorizationError,
  dispatchValidationError,
} from '~/utils/dispatchError'

export function createResponseValidationError() {
  const error = dispatchValidationError(Messages.FIELDS_VALIDATION_ERROR)

  return {
    contentSchemaPath: ApiSchemas.ERROR,
    code: error.status,
    content: {
      ok: false,
      data: error,
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

export function createResponseNeedLoginError() {
  const error = dispatchRequiredAuthorizationError()

  return {
    contentSchemaPath: ApiSchemas.ERROR,
    code: error.status,
    content: {
      ok: false,
      data: error,
    },
    description: 'O usuário precisa estar logado para realizar essa request',
  }
}
