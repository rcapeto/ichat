import { FindMyChatsController } from '~/app/controllers/app/chat/findMyChats'
import { FindMyChatsUseCase } from '~/app/use-cases/chat/findMyChats'
import { DatabaseChatRepository } from '~/database/app/chat'

const repository = new DatabaseChatRepository()
const useCase = new FindMyChatsUseCase(repository)
const controller = new FindMyChatsController(useCase)

export const findMyChats = controller.handler.bind(controller)
