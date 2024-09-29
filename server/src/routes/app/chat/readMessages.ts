import { ReadAllChatMessagesController } from '~/app/controllers/app/chat/readAllMessages'
import { ReadAllChatMessagesUseCase } from '~/app/use-cases/chat/readAllMessages'
import { DatabaseChatRepository } from '~/database/app/chat'

const repository = new DatabaseChatRepository()
const useCase = new ReadAllChatMessagesUseCase(repository)
const controller = new ReadAllChatMessagesController(useCase)

export const readMessages = controller.handler.bind(controller)
