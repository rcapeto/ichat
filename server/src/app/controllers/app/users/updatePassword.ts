import { createController } from '~/app/controllers/createController'
import { UpdatePasswordUserUseCase } from '~/app/use-cases/users/updatePassword'
import { Status } from '~/enums/status'

const loggerAction = 'When someone try to update your password'

export const UpdatePasswordUserController =
  createController<UpdatePasswordUserUseCase>(
    {
      loggerAction,
      successStatus: Status.OK,
    },
    async ({ request, useCase }) => {
      await useCase.execute({
        userId: request.userId,
        ...request.body,
      })

      return {}
    },
  )