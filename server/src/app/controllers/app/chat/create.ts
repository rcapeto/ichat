import { createController } from '~/app/controllers/createController'
import { CreateChatUseCase } from '~/app/use-cases/chat/create'
import { Status } from '~/enums/status'
import { SocketEvents } from '~/services/socket'
import { socketInstance } from '~/services/socket/socket-instance'

const loggerAction = 'When an user tries to create a new chat'

export const CreateChatController = createController<CreateChatUseCase>(
  {
    loggerAction,
    successStatus: Status.CREATED,
  },
  async ({ request, useCase }) => {
    const { chat } = await useCase.execute({
      userId: request.userId,
      contactId: request.body.contactId,
    })

    const owner = socketInstance.getSocketIdByUserId(chat.ownerId)
    const contact = socketInstance.getSocketIdByUserId(chat.contactId)

    socketInstance
      .getSocket()
      ?.to([owner, contact])
      .emit(SocketEvents.CREATE_CHAT, { chat })

    return { chat }
  },
)
