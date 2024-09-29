import { CreateChatController } from '~/app/controllers/app/chat/create'
import { CreateChatUseCase } from '~/app/use-cases/chat/create'
import { DatabaseChatRepository } from '~/database/app/chat'

const repository = new DatabaseChatRepository()
const useCase = new CreateChatUseCase(repository)
const controller = new CreateChatController(useCase)

export const create = controller.handler.bind(controller)
