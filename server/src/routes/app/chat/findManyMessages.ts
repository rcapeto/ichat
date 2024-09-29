import { FindManyChatMessagesController } from '~/app/controllers/app/chat/findManyMessages'
import { FindManyChatMessagesUseCase } from '~/app/use-cases/chat/findManyMessages'
import { DatabaseChatRepository } from '~/database/app/chat'

const repository = new DatabaseChatRepository()
const useCase = new FindManyChatMessagesUseCase(repository)
const controller = new FindManyChatMessagesController(useCase)

export const findManyMessages = controller.handler.bind(controller)
