import { createController } from '~/app/controllers/createController'
import { LoginUseCase } from '~/app/use-cases/auth/login'
import { Status } from '~/enums/status'

const loggerAction = 'When someone try to sign in'

export const LoginController = createController<LoginUseCase>(
  { loggerAction, successStatus: Status.OK },
  async ({ request, useCase }) => {
    return await useCase.execute(request.body)
  },
)
