import { UpdateUserController } from '~/app/controllers/app/users/update'
import { UpdateUserUseCase } from '~/app/use-cases/users/update'
import { DatabaseUserRepository } from '~/database/app/users'

const repository = new DatabaseUserRepository()
const useCase = new UpdateUserUseCase(repository)
const controller = new UpdateUserController(useCase)

export const update = controller.handler.bind(controller)
