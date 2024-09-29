import { createController } from '~/app/controllers/createController'
import { FindManyChatMessagesUseCase } from '~/app/use-cases/chat/findManyMessages'
import { Status } from '~/enums/status'

const loggerAction = 'FindManyChatMessages'

export const FindManyChatMessagesController =
  createController<FindManyChatMessagesUseCase>(
    {
      loggerAction,
      successStatus: Status.OK,
    },
    async ({ request, useCase }) => {
      const data = await useCase.execute({
        chatId: request.params.chatId,
        lastMessageId: request.params.lastMessageId,
      })

      return data
    },
  )
