import { createApiSchema } from '~/docs/utils/createApiSchema'
import { createRoute } from '~/docs/utils/createRoute'

import { LoginRequest } from '~/app/repositories/auth/types'
import { Response as LoginResponse } from '~/app/use-cases/auth/login'
import { ApiSchemas, DocumentSchema } from '~/docs/types'
import { Status } from '~/enums/status'
import { Messages } from '~/messages'
import { endpoints } from '~/routes/endpoints'
import { makeUser } from '~/tests/utils'
import {
  dispatchNotFoundError,
  dispatchValidationError,
} from '~/utils/dispatchError'
import { getCorrectEndpoint } from '../utils/getCorrectEndpoint'

const authEndpoints = endpoints.authentication

const loginRoute = createRoute<LoginRequest, LoginResponse>

const tag = 'Authorization'

const paths = {
  [getCorrectEndpoint(authEndpoints.login)]: loginRoute({
    routes: [
      {
        method: 'post',
        description: 'Sing in in the application',
        summary: 'Sing In',
        tags: [tag],
        requestBody: {
          schema: 'LoginRequest',
          example: {
            email: 'user@email.com',
            password: 'user-password',
          },
        },
        responses: [
          {
            contentSchemaPath: ApiSchemas.ERROR,
            code: Status.BAD_REQUEST,
            content: {
              ok: false,
              data: dispatchValidationError(Messages.FIELDS_VALIDATION_ERROR),
            },
            description: 'Fields validation',
          },
          {
            contentSchemaPath: ApiSchemas.ERROR,
            code: Status.NOT_FOUND,
            content: {
              ok: false,
              data: dispatchNotFoundError(Messages.DOES_NOT_FOUND_USER),
            },
            description: 'When the user doest not exists',
          },
          {
            code: Status.OK,
            content: {
              ok: true,
              data: {
                session: makeUser(),
                token: 'token',
              },
            },
            contentSchemaPath: 'LoginResponse',
            description: 'Get user data with success',
          },
        ],
      },
    ],
  }),
}

const schemas: DocumentSchema = {
  LoginRequest: {
    type: 'object',
    properties: {
      email: { type: 'string' },
      password: { type: 'string' },
    },
  },
  LoginResponse: createApiSchema({
    type: 'object',
    properties: {
      token: { type: 'string' },
      session: {
        type: 'object',
        properties: {
          firstName: { type: 'string' },
          password: { type: 'string' },
          lastName: { type: 'string' },
          email: { type: 'string' },
          profileImage: { type: 'string' },
          createdAt: { type: 'string' },
          id: { type: 'string' },
        },
      },
    },
  }),
}

export default { paths, schemas }
