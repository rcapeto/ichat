import { FindManyUsersController } from '~/app/controllers/app/users/findMany'
import { FindManyUsersUseCase } from '~/app/use-cases/users/findMany'
import { DatabaseUserRepository } from '~/database/app/users'

const repository = new DatabaseUserRepository()
const useCase = new FindManyUsersUseCase(repository)
const controller = new FindManyUsersController(useCase)

export const findMany = controller.handler.bind(controller)
