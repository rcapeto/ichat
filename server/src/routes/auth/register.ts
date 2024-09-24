import { RegisterController } from '~/app/controllers/auth/register'
import { RegisterUseCase } from '~/app/use-cases/auth/register'
import { DatabaseAuthRepository } from '~/database/auth'
import { apiLogger } from '~/services/logger'

const repository = new DatabaseAuthRepository()
const useCase = new RegisterUseCase(repository)
const controller = new RegisterController(useCase, apiLogger())

export const register = controller.handler.bind(controller)
