import { createController } from '~/app/controllers/createController'
import { SessionUseCase } from '~/app/use-cases/auth/session'
import { Status } from '~/enums/status'

const loggerAction = 'Session'

export const SessionController = createController<SessionUseCase>(
  { loggerAction, successStatus: Status.OK },
  async ({ request, useCase }) => {
    const token = (request.query.token ?? '') as string

    return await useCase.execute({
      token,
    })
  },
)
