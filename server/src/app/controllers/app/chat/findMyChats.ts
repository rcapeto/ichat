import { createController } from '~/app/controllers/createController'
import { FindMyChatsUseCase } from '~/app/use-cases/chat/findMyChats'
import { Status } from '~/enums/status'

const loggerAction = 'FindMyChats'

export const FindMyChatsController = createController<FindMyChatsUseCase>(
  {
    loggerAction,
    successStatus: Status.OK,
  },
  async ({ request, useCase }) => {
    const data = await useCase.execute({
      userId: request.userId,
    })

    return data
  },
)
