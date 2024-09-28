import {
  CreateChatRequest,
  CreateChatResponse,
} from '~/app/repositories/chats/types'
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
import { makeUserSession } from '~/tests/utils'
import { dispatchError } from '~/utils/dispatchError'

const chatEndpoints = endpoints.app.chat

const create = createRoute<
  Omit<CreateChatRequest, 'userId'>,
  CreateChatResponse
>

const tag = 'Chats'

const paths = {
  [getCorrectEndpoint(chatEndpoints.create)]: create({
    routes: [
      {
        method: 'post',
        description: 'Criar um novo chat',
        summary: 'Criar chat',
        tags: [tag],
        isPrivate: true,
        requestBody: {
          example: {
            contactId: 'uuid-contact',
          },
          schema: 'CreateChatRequest',
        },
        responses: [
          createResponseNeedLoginError(),
          createResponseError(
            dispatchError({
              errorType: ErrorType.ERROR,
              message: Messages.CHAT_ALREADY_EXISTS,
              status: Status.BAD_REQUEST,
            }),
            'Quando já existe um chat entre esses usuários',
          ),
          {
            code: Status.OK,
            content: {
              ok: true,
              data: {
                chat: {
                  contact: makeUserSession(),
                  contactId: 'contact-uuid',
                  contactUnreadCount: 0,
                  createdAt: new Date().toISOString(),
                  id: 'chat-uuid',
                  messages: [],
                  owner: makeUserSession(),
                  ownerId: 'owner-uuid',
                  ownerUnreadCount: 0,
                },
              },
            },
            contentSchemaPath: 'CreateChatResponse',
            description: 'Chat criado',
          },
        ],
      },
    ],
  }),
}

const schemas: DocumentSchema = {
  CreateChatRequest: {
    type: 'object',
    properties: {
      contactId: { type: 'string' },
    },
  },
  CreateChatResponse: {
    type: 'object',
    properties: {
      chat: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            contact: {
              type: 'object',
              properties: {
                createdAt: { type: 'string' },
                email: { type: 'string' },
                firstName: { type: 'string' },
                id: { type: 'string' },
                lastName: { type: 'string' },
                profileImage: { type: 'string' },
              },
            },
            contactId: { type: 'string' },
            contactUnreadCount: { type: 'number' },
            createdAt: { type: 'string' },
            id: { type: 'string' },
            messages: {
              type: 'array',
              items: {
                type: 'object',
                properties: {},
              },
            },
            owner: {
              type: 'object',
              properties: {
                createdAt: { type: 'string' },
                email: { type: 'string' },
                firstName: { type: 'string' },
                id: { type: 'string' },
                lastName: { type: 'string' },
                profileImage: { type: 'string' },
              },
            },
            ownerId: { type: 'string' },
            ownerUnreadCount: { type: 'number' },
          },
        },
      },
    },
  },
}

export default { paths, schemas }
