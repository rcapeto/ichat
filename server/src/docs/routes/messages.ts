import {
  CreateMessageRequest,
  CreateMessageResponse,
} from '~/app/repositories/messages/types'
import { DocumentSchema } from '~/docs/types'
import {
  createResponseError,
  createResponseNeedLoginError,
} from '~/docs/utils/createErrorResponse'
import { createRoute } from '~/docs/utils/createRoute'
import { getCorrectEndpoint } from '~/docs/utils/getCorrectEndpoint'
import { ErrorType } from '~/enums/errorType'
import { Status } from '~/enums/status'
import { Messages } from '~/messages'
import { endpoints } from '~/routes/endpoints'
import { dispatchError } from '~/utils/dispatchError'
import { createApiSchema } from '../utils/createApiSchema'

const messagesEndpoints = endpoints.app.message

const create = createRoute<
  Omit<CreateMessageRequest, 'userId'>,
  CreateMessageResponse
>

const tag = 'Messages'

const paths = {
  [getCorrectEndpoint(messagesEndpoints.create)]: create({
    routes: [
      {
        method: 'post',
        description: 'Criar uma nova mensagem',
        summary: 'Criar mensagem',
        tags: [tag],
        isPrivate: true,
        requestBody: {
          example: {
            chatId: 'chat-uuid',
            content: 'any-text-content',
            file: 'any-file',
          },
          schema: 'CreateMessageRequest',
        },
        responses: [
          createResponseNeedLoginError(),
          createResponseError(
            dispatchError({
              errorType: ErrorType.ERROR,
              message: Messages.DOES_NOT_FOUND_CHAT,
              status: Status.BAD_REQUEST,
            }),
            'Quando chat não foi encontrado',
          ),
          {
            code: Status.CREATED,
            content: {
              ok: true,
              data: {
                contactId: 'contact-uuid',
                contactUnreadCount: 1,
                ownerUnreadCount: 0,
                message: {
                  chatId: 'chat-uuid',
                  content: 'any-text-content',
                  fileUrl: '',
                  id: 'message-uuid',
                  createdAt: new Date().toISOString(),
                  owner: {
                    createdAt: new Date().toISOString(),
                    email: 'johndoe@email.com',
                    firstName: 'John',
                    lastName: 'Doe',
                    id: 'owner-uuid',
                    profileImage: '',
                  },
                  ownerId: 'owner-uuid',
                  read: false,
                },
              },
            },
            contentSchemaPath: 'CreateMessageResponse',
            description: 'Mensagem criado',
          },
        ],
      },
    ],
  }),
}

const schemas: DocumentSchema = {
  CreateMessageRequest: {
    type: 'object',
    properties: {
      chatId: { type: 'string' },
      content: { type: 'string' },
      file: { type: 'string' },
    },
  },
  CreateMessageResponse: createApiSchema({
    type: 'object',
    properties: {
      contactUnreadCount: { type: 'number' },
      ownerUnreadCount: { type: 'number' },
      contactId: { type: 'string' },
      message: {
        type: 'object',
        properties: {
          chatId: { type: 'string' },
          content: { type: 'string' },
          createdAt: { type: 'string' },
          fileUrl: { type: 'string' },
          id: { type: 'string' },
          read: { type: 'boolean' },
          ownerId: { type: 'boolean' },
          owner: {
            type: 'object',
            properties: {
              firstName: { type: 'string' },
              lastName: { type: 'string' },
              email: { type: 'string' },
              profileImage: { type: 'string' },
              createdAt: { type: 'string' },
              id: { type: 'string' },
            },
          },
        },
      },
    },
  }),
}

export default { paths, schemas }
