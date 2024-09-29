import { describe } from '@jest/globals'
import { ApiError } from '~/entities/apiError'
import { ErrorType } from '~/enums/errorType'
import { Status } from '~/enums/status'
import { TestChatRepository } from '~/tests/chat'
import { makeChat, makeMessage } from '~/tests/utils'
import { dispatchError } from '~/utils/dispatchError'
import { FindManyChatMessagesUseCase } from './index'

const repository = new TestChatRepository()
const useCase = new FindManyChatMessagesUseCase(repository)

describe('FindManyChatMessagesUseCase', () => {
  beforeEach(() => {
    repository.resetDB()
  })

  it('should not be able get all chat messages if user does not send chatId or lastMessageId', () => {
    useCase
      .execute({
        chatId: '',
        lastMessageId: '',
      })
      .catch((err: ApiError) => {
        const error = dispatchError({
          errorType: ErrorType.VALIDATION,
          message: 'any-message',
          status: Status.BAD_REQUEST,
        })

        expect(err.errorType).toBe(error.errorType)
        expect(err.status).toBe(error.status)
      })
  })

  it('should be able get all chat messages', async () => {
    const chat = makeChat()

    for (let index = 0; index < 25; index++) {
      const message = makeMessage({
        content: `message-index-${index}`,
        chatId: chat.id,
      })

      chat.messages.push(message)
    }

    repository.setChat(chat)

    const chatMessages = await repository.getChatMessagesById(chat.id)
    const lastMessage = chatMessages.slice(0, 20)[19]

    const { lastPage, messages } = await useCase.execute({
      chatId: chat.id,
      lastMessageId: lastMessage.id,
    })

    expect(lastPage).toBeTruthy()
  })
})
