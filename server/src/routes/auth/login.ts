import { LoginController } from '~/app/controllers/auth/login'
import { LoginUseCase } from '~/app/use-cases/auth/login'
import { DatabaseAuthRepository } from '~/database/auth'
import { apiLogger } from '~/services/logger'

const repository = new DatabaseAuthRepository()
const useCase = new LoginUseCase(repository)
const controller = new LoginController(useCase, apiLogger())

export const login = controller.handler.bind(controller)
