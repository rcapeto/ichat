import {
  CreateChatRequest,
  CreateChatResponse,
  FindManyChatMessagesRequest,
  FindManyChatMessagesResponse,
  FindMyChatsRequest,
  FindMyChatsResponse,
  ReadAllChatMessagesRequest,
} from '~/app/repositories/chats/types'
import { DocumentSchema } from '~/docs/types'
import {
  createResponseError,
  createResponseNeedLoginError,
  createResponseValidationError,
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

const findMyChats = createRoute<
  Omit<FindMyChatsRequest, 'userId'>,
  FindMyChatsResponse
>

const readAllMessages = createRoute<
  Omit<ReadAllChatMessagesRequest, 'userId'>,
  void
>

const findManyChatMessages = createRoute<
  FindManyChatMessagesRequest,
  FindManyChatMessagesResponse
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
                  updatedAt: new Date().toISOString(),
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
  [getCorrectEndpoint(chatEndpoints.myChats)]: findMyChats({
    routes: [
      {
        method: 'get',
        description: 'Obter meus chats',
        summary: 'Obter chats',
        tags: [tag],
        isPrivate: true,
        responses: [
          createResponseNeedLoginError(),
          {
            code: Status.OK,
            content: {
              ok: true,
              data: {
                chats: [
                  {
                    avatar: 'chat image',
                    id: 'chat-uuid',
                    messages: [],
                    name: 'Other user full name',
                    notification: 0,
                    updatedAt: new Date().toISOString(),
                  },
                ],
              },
            },
            contentSchemaPath: 'FindMyChatsResponse',
            description: 'Meus chats',
          },
        ],
      },
    ],
  }),
  [getCorrectEndpoint(chatEndpoints.readMessages)]: readAllMessages({
    routes: [
      {
        method: 'put',
        description: 'Ler mensagens do outro usuário dentro de um chat',
        summary: 'Ler mensagens',
        tags: [tag],
        requestBody: {
          example: {
            chatId: 'chat-uuid',
          },
          schema: 'ReadAllChatMessagesRequest',
        },
        isPrivate: true,
        responses: [
          createResponseNeedLoginError(),
          createResponseValidationError(),
          createResponseError(
            dispatchError({
              errorType: ErrorType.NOT_FOUND,
              status: Status.BAD_REQUEST,
              message: Messages.DOES_NOT_FOUND_CHAT,
            }),
            'Quando o chat não é encontrado',
          ),
          {
            code: Status.OK,
            content: {},
            contentSchemaPath: 'FindMyChatsResponse',
            description: 'Meus chats',
          },
        ],
      },
    ],
  }),
  [getCorrectEndpoint(chatEndpoints.findManyMessages)]: findManyChatMessages({
    routes: [
      {
        method: 'get',
        description: 'Paginação para obter as mensagens do chat que restam',
        summary: 'Obter mensagens',
        tags: [tag],
        parameters: [
          {
            in: 'path',
            name: 'chatId',
            description: 'ID do chat',
            required: true,
            schema: { type: 'string' },
          },
          {
            in: 'path',
            name: 'lastMessageId',
            description: 'ID da última mensagem',
            required: true,
            schema: { type: 'string' },
          },
        ],
        isPrivate: true,
        responses: [
          createResponseNeedLoginError(),
          createResponseValidationError(),
          createResponseError(
            dispatchError({
              errorType: ErrorType.NOT_FOUND,
              status: Status.NOT_FOUND,
              message: Messages.DOES_NOT_FOUND_MESSAGE,
            }),
            'Quando a mensagem não é encontrada',
          ),
          {
            code: Status.OK,
            content: {
              ok: true,
              data: {
                lastPage: true,
                messages: [
                  {
                    chatId: 'chat-uuid',
                    content: 'any-message-content',
                    createdAt: new Date().toISOString(),
                    fileUrl: '',
                    id: 'message-uuid',
                    owner: {
                      createdAt: new Date().toISOString(),
                      email: 'johndoe@email.com',
                      firstName: 'John',
                      lastName: 'Doe',
                      id: 'user-uuid',
                      profileImage: '',
                    },
                    ownerId: 'user-uuid',
                    read: false,
                  },
                ],
              },
            },
            contentSchemaPath: 'FindManyChatMessagesResponse',
            description: 'Meus chats',
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
            updatedAt: { type: 'string' },
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
  FindMyChatsResponse: {
    type: 'object',
    properties: {
      chats: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            avatar: { type: 'string' },
            id: { type: 'string' },
            name: { type: 'string' },
            notification: { type: 'number' },
            updatedAt: { type: 'string' },
            messages: {
              type: 'array',
              items: {
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
          },
        },
      },
    },
  },
  ReadAllChatMessagesRequest: {
    type: 'object',
    properties: {
      chatId: { type: 'string' },
    },
  },
  FindManyChatMessagesResponse: {
    type: 'object',
    properties: {
      messages: {
        type: 'array',
        items: {
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
      lastPage: {
        type: 'boolean',
      },
    },
  },
}

export default { paths, schemas }
