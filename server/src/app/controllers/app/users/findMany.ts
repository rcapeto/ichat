import { createController } from '~/app/controllers/createController'
import { FindManyUsersUseCase } from '~/app/use-cases/users/findMany'
import { Status } from '~/enums/status'

const loggerAction = 'When someone try to get users'

export const FindManyUsersController = createController<FindManyUsersUseCase>(
  {
    loggerAction,
    successStatus: Status.OK,
  },
  async ({ request, useCase }) => {
    const page = request.query.page as string
    const query = request.query.search as string

    const data = await useCase.execute({
      userId: request.userId,
      page,
      query,
    })

    return data
  },
)
