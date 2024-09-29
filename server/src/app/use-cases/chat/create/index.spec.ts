import { describe } from '@jest/globals'
import { ApiError } from '~/entities/apiError'
import { ErrorType } from '~/enums/errorType'
import { Status } from '~/enums/status'
import { Messages } from '~/messages'
import { TestChatRepository } from '~/tests/chat'
import { makeChat, makeUser } from '~/tests/utils'
import { dispatchError } from '~/utils/dispatchError'
import { CreateChatUseCase } from './index'

const repository = new TestChatRepository()
const useCase = new CreateChatUseCase(repository)

describe('CreateChatUseCase', () => {
  beforeEach(() => {
    repository.resetDB()
  })

  it('should not be able create a chat when already exist', () => {
    const user = makeUser()
    const me = makeUser()
    const chat = makeChat({ contactId: user.id, ownerId: me.id })

    repository.setChat(chat)

    useCase
      .execute({ contactId: user.id, userId: me.id })
      .catch((err: ApiError) => {
        const error = dispatchError({
          errorType: ErrorType.ERROR,
          message: Messages.CHAT_ALREADY_EXISTS,
          status: Status.BAD_REQUEST,
        })

        expect(err.message).toBe(error.message)
        expect(err.errorType).toBe(error.errorType)
        expect(err.status).toBe(error.status)
      })
  })

  it('should be able create a chat', async () => {
    const user = makeUser()
    const me = makeUser()

    const { chat } = await useCase.execute({
      contactId: user.id,
      userId: me.id,
    })

    expect(chat.ownerId).toBe(me.id)
    expect(chat.contactId).toBe(user.id)
  })
})
