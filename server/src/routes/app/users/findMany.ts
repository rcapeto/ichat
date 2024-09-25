import { FindManyUsersController } from '~/app/controllers/app/users/findMany'
import { FindManyUsersUseCase } from '~/app/use-cases/users/findMany'
import { DatabaseUserRepository } from '~/database/app/users'
import { apiLogger } from '~/services/logger'

const repository = new DatabaseUserRepository()
const useCase = new FindManyUsersUseCase(repository)
const controller = new FindManyUsersController(useCase, apiLogger())

export const findMany = controller.handler.bind(controller)
