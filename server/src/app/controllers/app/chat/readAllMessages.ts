import { createController } from '~/app/controllers/createController'
import { ReadAllChatMessagesUseCase } from '~/app/use-cases/chat/readAllMessages'
import { Status } from '~/enums/status'
import { SocketEvents } from '~/services/socket'
import { socketInstance } from '~/services/socket/socket-instance'

const loggerAction = 'ReadAllChatMessages'

const socket = socketInstance.getSocket()

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

      socket
        ?.to([ownerSocketId, contactSocketId])
        .emit(SocketEvents.USER_READ_MESSAGE, {
          chatId,
          userReadMessagesId: request.userId,
        })

      return {}
    },
  )
