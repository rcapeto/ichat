import { createController } from '~/app/controllers/createController'
import { ReadAllChatMessagesUseCase } from '~/app/use-cases/chat/readAllMessages'
import { Status } from '~/enums/status'
import {
  io,
  ReadChatMessagesSocketEventResponse,
  SocketEvents,
} from '~/services/socket'

const loggerAction = 'ReadAllChatMessages'

export const ReadAllChatMessagesController =
  createController<ReadAllChatMessagesUseCase>(
    {
      loggerAction,
      successStatus: Status.OK,
    },
    async ({ request, useCase }) => {
      const { chatId, contactId, ownerId } = await useCase.execute({
        userId: request.userId,
        ...request.body,
      })

      io.to([ownerId, contactId]).emit(SocketEvents.USER_READ_MESSAGE, {
        chatId,
        userReadMessagesId: request.userId,
      } as ReadChatMessagesSocketEventResponse)

      return {}
    },
  )
