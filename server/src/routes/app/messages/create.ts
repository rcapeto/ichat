import { CreateMessageController } from '~/app/controllers/app/messages/create'
import { CreateMessageUseCase } from '~/app/use-cases/messages/create'
import { DatabaseMessageRepository } from '~/database/app/messages'

const repository = new DatabaseMessageRepository()
const useCase = new CreateMessageUseCase(repository)
const controller = new CreateMessageController(useCase)

export const create = controller.handler.bind(controller)
