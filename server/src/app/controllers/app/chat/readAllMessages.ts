import { createController } from '~/app/controllers/createController'
import { ReadAllChatMessagesUseCase } from '~/app/use-cases/chat/readAllMessages'
import { Status } from '~/enums/status'
import { io, SocketEvents, socketInstance } from '~/services/socket'

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

      const ownerSocketId = socketInstance.getSocketIdByUserId(ownerId)
      const contactSocketId = socketInstance.getSocketIdByUserId(contactId)

      io
        ?.to([ownerSocketId, contactSocketId])
        .emit(SocketEvents.USER_READ_MESSAGE, {
          chatId,
          userReadMessagesId: request.userId,
        })

      return {}
    },
  )
