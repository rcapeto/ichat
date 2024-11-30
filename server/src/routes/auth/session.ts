import { SessionController } from '~/app/controllers/auth/session'
import { SessionUseCase } from '~/app/use-cases/auth/session'
import { DatabaseAuthRepository } from '~/database/auth'

const repository = new DatabaseAuthRepository()
const useCase = new SessionUseCase(repository)
const controller = new SessionController(useCase)

export const session = controller.handler.bind(controller)
