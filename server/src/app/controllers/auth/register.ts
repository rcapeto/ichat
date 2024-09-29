import { createController } from '~/app/controllers/createController'
import { RegisterUseCase } from '~/app/use-cases/auth/register'
import { Status } from '~/enums/status'

const loggerAction = 'CreateAccount'

export const RegisterController = createController<RegisterUseCase>(
  {
    loggerAction,
    successStatus: Status.CREATED,
  },
  async ({ useCase, request }) => {
    await useCase.execute(request.body)
    return {}
  },
)
