import {
  FindManyUserRequest,
  FindManyUserResponse,
} from '~/app/repositories/users/types'
import { DocumentSchema } from '~/docs/types'
import { createResponseNeedLoginError } from '~/docs/utils/createErrorResponse'
import { createRoute } from '~/docs/utils/createRoute'
import { getCorrectEndpoint } from '~/docs/utils/getCorrectEndpoint'
import { Status } from '~/enums/status'
import { endpoints } from '~/routes/endpoints'

const userEndpoints = endpoints.app.user

const findMany = createRoute<FindManyUserRequest, FindManyUserResponse>

const tag = 'Users'

const paths = {
  [getCorrectEndpoint(userEndpoints.findMany)]: findMany({
    routes: [
      {
        method: 'get',
        description: 'Obter usuários disponíveis',
        summary: 'Obter os usuários',
        tags: [tag],
        isPrivate: true,
        parameters: [
          {
            in: 'query',
            name: 'page',
            description: 'Página',
            required: false,
            schema: { type: 'string' },
          },
          {
            in: 'query',
            name: 'search',
            description:
              'Filtrar usuário pelo primeiro nome, último nome ou email',
            required: false,
            schema: { type: 'string' },
          },
        ],
        responses: [
          createResponseNeedLoginError(),
          {
            code: Status.OK,
            content: {
              ok: true,
              data: {
                count: 1,
                page: 1,
                totalPages: 1,
                users: [
                  {
                    firstName: 'Berry',
                    lastName: 'Schmitt',
                    email: 'Aubree_Lowe83@yahoo.com',
                    profileImage: null,
                    id: '00733f4a-7139-4330-87d2-b99530b291a0',
                    createdAt: '2024-09-25T21:46:26.000Z',
                  },
                ],
              },
            },
            contentSchemaPath: 'FindManyUsersResponse',
            description: 'Todos os usuários',
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
  FindManyUsersResponse: {
    type: 'object',
    properties: {
      count: { type: 'number' },
      page: { type: 'number' },
      totalPages: { type: 'number' },
      users: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string' },
            profileImage: { type: 'string' },
            id: { type: 'string' },
          },
        },
      },
    },
  },
}

export default { paths, schemas }
