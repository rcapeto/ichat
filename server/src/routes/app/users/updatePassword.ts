import { UpdatePasswordUserController } from '~/app/controllers/app/users/updatePassword'
import { UpdatePasswordUserUseCase } from '~/app/use-cases/users/updatePassword'
import { DatabaseUserRepository } from '~/database/app/users'

const repository = new DatabaseUserRepository()
const useCase = new UpdatePasswordUserUseCase(repository)
const controller = new UpdatePasswordUserController(useCase)

export const updatePassword = controller.handler.bind(controller)
