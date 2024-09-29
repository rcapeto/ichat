import { describe } from '@jest/globals'
import { ApiError } from '~/entities/apiError'
import { ErrorType } from '~/enums/errorType'
import { Status } from '~/enums/status'
import { Messages } from '~/messages'
import { TestMessageRepository } from '~/tests/messages'
import { makeChat, makeUser } from '~/tests/utils'
import { dispatchError, dispatchNotFoundError } from '~/utils/dispatchError'
import { CreateMessageUseCase } from './index'

const repository = new TestMessageRepository()
const useCase = new CreateMessageUseCase(repository)

describe('CreateMessageUseCase', () => {
  beforeEach(() => {
    repository.resetDB()
  })

  it('should not be able create a message without content', () => {
    useCase
      .execute({
        chatId: '',
        content: '',
        userId: '',
      })
      .catch((err: ApiError) => {
        const error = dispatchError({
          errorType: ErrorType.VALIDATION,
          message: 'any-validation-message',
          status: Status.BAD_REQUEST,
        })

        expect(err.errorType).toBe(error.errorType)
        expect(err.status).toBe(error.status)
      })
  })

  it('should not be able create a message when chat does not exists', () => {
    const chat = makeChat()
    const user = makeUser()

    useCase
      .execute({
        chatId: chat.id,
        content: 'any-content',
        userId: user.id,
      })
      .catch((err: ApiError) => {
        const error = dispatchNotFoundError(Messages.DOES_NOT_FOUND_CHAT)

        expect(err.errorType).toBe(error.errorType)
        expect(err.status).toBe(error.status)
        expect(err.message).toBe(error.message)
      })
  })

  it('should be able create a message', async () => {
    const chat = makeChat()
    const user = makeUser()
    const content = 'any-content'

    repository.insertNewChat(chat)

    const { message } = await useCase.execute({
      chatId: chat.id,
      content,
      userId: user.id,
    })

    expect(message.content).toBe(content)
    expect(message.ownerId).toBe(user.id)
    expect(message.chatId).toBe(chat.id)
  })
})
