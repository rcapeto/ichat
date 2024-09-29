import { createController } from '~/app/controllers/createController'
import { CreateMessageUseCase } from '~/app/use-cases/messages/create'
import { Status } from '~/enums/status'
import { SocketEvents } from '~/services/socket'
import { socketInstance } from '~/services/socket/socket-instance'

const socket = socketInstance.getSocket()
const loggerAction = 'CreateMessage'

export const CreateMessageController = createController<CreateMessageUseCase>(
  {
    loggerAction,
    successStatus: Status.CREATED,
  },
  async ({ request, useCase }) => {
    const file = request.file?.filename
    const userId = request.userId

    const data = await useCase.execute({
      ...request.body,
      userId,
      file,
    })

    const userSocketId = socketInstance.getSocketIdByUserId(userId)
    const contactSocketId = socketInstance.getSocketIdByUserId(data.contactId)

    socket?.to([userSocketId, contactSocketId]).emit(SocketEvents.MESSAGE, data)

    return data
  },
)
