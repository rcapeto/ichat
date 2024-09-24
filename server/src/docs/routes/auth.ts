import { createApiSchema } from '~/docs/utils/createApiSchema'
import { createRoute } from '~/docs/utils/createRoute'

import {
  LoginRequest,
  RegisterRequest,
  RegisterResponse,
} from '~/app/repositories/auth/types'
import { Response as LoginResponse } from '~/app/use-cases/auth/login'
import { DocumentSchema } from '~/docs/types'
import {
  createResponseError,
  createResponseValidationError,
} from '~/docs/utils/createErrorResponse'
import { getCorrectEndpoint } from '~/docs/utils/getCorrectEndpoint'
import { ErrorType } from '~/enums/errorType'
import { Status } from '~/enums/status'
import { Messages } from '~/messages'
import { endpoints } from '~/routes/endpoints'
import { makeUser } from '~/tests/utils'
import { dispatchError, dispatchNotFoundError } from '~/utils/dispatchError'

const authEndpoints = endpoints.authentication

const loginRoute = createRoute<LoginRequest, LoginResponse>
const registerRoute = createRoute<RegisterRequest, RegisterResponse>

const tag = 'Authorization'

const paths = {
  [getCorrectEndpoint(authEndpoints.login)]: loginRoute({
    routes: [
      {
        method: 'post',
        description: 'Obter dados para entrar na aplicação',
        summary: 'Entrar',
        tags: [tag],
        requestBody: {
          schema: 'LoginRequest',
          example: {
            email: 'user@email.com',
            password: 'user-password',
          },
        },
        responses: [
          createResponseValidationError(),
          createResponseError(
            dispatchNotFoundError(Messages.DOES_NOT_FOUND_USER),
            'Quando o usuário não é encontrado',
          ),
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
            description: 'Obter os dados do usuário com sucesso',
          },
        ],
      },
    ],
  }),
  [getCorrectEndpoint(authEndpoints.register)]: registerRoute({
    routes: [
      {
        method: 'post',
        description: 'Criação de uma nova conta',
        summary: 'Registrar',
        tags: [tag],
        requestBody: {
          schema: 'LoginRequest',
          example: {
            confirmPassword: '@SecretPassword123',
            password: '@SecretPassword123',
            email: 'fake@email.com',
            firstName: 'John',
            lastName: 'Doe',
          },
        },
        responses: [
          createResponseValidationError(),
          createResponseError(
            dispatchError({
              errorType: ErrorType.ERROR,
              message: Messages.EMAIL_OR_PASSWORD_IS_INVALID,
              status: Status.BAD_REQUEST,
            }),
            'O email já está sendo utilizado',
          ),
          {
            code: Status.CREATED,
            content: {
              ok: true,
              data: {},
            },
            contentSchemaPath: 'RequestResponse',
            description: 'Conta criada com sucesso',
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
  RegisterRequest: {
    type: 'object',
    properties: {
      email: { type: 'string' },
      password: { type: 'string' },
      confirmPassword: { type: 'string' },
      firstName: { type: 'string' },
      lastName: { type: 'string' },
    },
  },
  RegisterResponse: {
    type: 'object',
    properties: {},
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
