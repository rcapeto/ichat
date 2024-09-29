import { describe } from '@jest/globals'
import { TestChatRepository } from '~/tests/chat'
import { makeChat, makeUser } from '~/tests/utils'
import { FindMyChatsUseCase } from './index'

const repository = new TestChatRepository()
const useCase = new FindMyChatsUseCase(repository)

describe('FindMyChatsUseCase', () => {
  beforeEach(() => {
    repository.resetDB()
  })

  it('should be able get my chats', async () => {
    const me = makeUser()
    const contact = makeUser()

    repository.setChat(
      makeChat({ ownerId: me.id, contactId: contact.id }),
      makeChat({ ownerId: contact.id, contactId: me.id }),
    )

    const { chats } = await useCase.execute({ userId: me.id })

    expect(chats).toHaveLength(2)
  })
})
