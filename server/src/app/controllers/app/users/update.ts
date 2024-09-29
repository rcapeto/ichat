import { createController } from '~/app/controllers/createController'
import { UpdateUserUseCase } from '~/app/use-cases/users/update'
import { Status } from '~/enums/status'

const loggerAction = 'UpdateUser'

export const UpdateUserController = createController<UpdateUserUseCase>(
  {
    loggerAction,
    successStatus: Status.OK,
  },
  async ({ request, useCase }) => {
    const profileImage = request.file?.filename

    const isResetImage = request.body.profileImage === ''
    const withImage = Boolean(profileImage)

    const data = await useCase.execute({
      userId: request.userId,
      ...request.body,
      profileImage: withImage ? profileImage : isResetImage ? '' : null,
    })

    return data
  },
)
