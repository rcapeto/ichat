import { describe } from '@jest/globals'
import { ApiError } from '~/entities/apiError'
import { ErrorType } from '~/enums/errorType'
import { Status } from '~/enums/status'
import { Messages } from '~/messages'
import { TestChatRepository } from '~/tests/chat'
import { makeChat, makeMessage, makeUser } from '~/tests/utils'
import { dispatchError, dispatchNotFoundError } from '~/utils/dispatchError'
import { ReadAllChatMessagesUseCase } from './index'

const repository = new TestChatRepository()
const useCase = new ReadAllChatMessagesUseCase(repository)

describe('ReadAllChatMessagesUseCase', () => {
  beforeEach(() => {
    repository.resetDB()
  })

  it('should not update messages if chat does not exists', () => {
    const chat = makeChat()
    const me = makeUser()

    useCase
      .execute({ chatId: chat.id, userId: me.id })
      .catch((err: ApiError) => {
        const error = dispatchNotFoundError(Messages.DOES_NOT_FOUND_CHAT)

        expect(err.errorType).toBe(error.errorType)
        expect(err.status).toBe(error.status)
        expect(err.message).toBe(error.message)
      })
  })

  it('should not update messages if user is not inside the chat', () => {
    const chat = makeChat()
    const me = makeUser()

    repository.setChat(chat)

    useCase
      .execute({ chatId: chat.id, userId: me.id })
      .catch((err: ApiError) => {
        const error = dispatchError({
          errorType: ErrorType.ERROR,
          message: Messages.ERROR_READ_MESSAGES,
          status: Status.BAD_REQUEST,
        })

        expect(err.errorType).toBe(error.errorType)
        expect(err.status).toBe(error.status)
        expect(err.message).toBe(error.message)
      })
  })

  it('should be able change only my messages status inside a chat', async () => {
    const me = makeUser()
    const contact = makeUser()

    const chat = makeChat({ ownerId: me.id, contactId: contact.id })

    const myMessage = makeMessage({ chatId: chat.id, ownerId: me.id })
    const contactMessage = makeMessage({ chatId: chat.id, ownerId: contact.id })

    chat.messages = [myMessage, contactMessage]

    repository.setChat(chat)

    await useCase.execute({ chatId: chat.id, userId: me.id })
    const dbChat = await repository.findChatById(chat.id)

    expect(dbChat.messages[0].read).toBeFalsy()
    expect(dbChat.messages[1].read).toBeTruthy()
  })
})
