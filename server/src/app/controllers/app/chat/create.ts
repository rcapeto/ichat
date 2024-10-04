import { createController } from '~/app/controllers/createController'
import { CreateChatUseCase } from '~/app/use-cases/chat/create'
import { Status } from '~/enums/status'
import { SocketEvents, io } from '~/services/socket'

const loggerAction = 'CreateChat'

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

    io
      ?.to([chat.ownerId, chat.contactId])
      .emit(SocketEvents.CREATE_CHAT, { chat })

    return { chat }
  },
)
