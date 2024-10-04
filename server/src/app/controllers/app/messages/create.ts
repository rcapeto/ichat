import { createController } from '~/app/controllers/createController'
import { CreateMessageUseCase } from '~/app/use-cases/messages/create'
import { Status } from '~/enums/status'
import { SocketEvents, io } from '~/services/socket'

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

    io.to([data.contactId, data.message.ownerId]).emit(
      SocketEvents.MESSAGE,
      data,
    )

    return data
  },
)
