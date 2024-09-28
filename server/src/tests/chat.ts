import { ChatRepository } from '~/app/repositories/chats'
import {
  CreateChatRequest,
  CreateChatResponse,
} from '~/app/repositories/chats/types'
import { Chat } from '~/entities/app/Chat'
import { ErrorType } from '~/enums/errorType'
import { Status } from '~/enums/status'
import { Messages } from '~/messages'
import { dispatchError } from '~/utils/dispatchError'
import { makeChat } from './utils'

export class TestChatRepository implements ChatRepository {
  private chats: Chat[] = []

  async create(request: CreateChatRequest): Promise<CreateChatResponse> {
    const { contactId, userId } = request

    await Promise.all([this.checkExistsChat(contactId, userId)])

    const chat = makeChat({ ownerId: userId, contactId })

    this.setChat(chat)

    return { chat }
  }

  async checkExistsChat(contactId: string, userId: string) {
    const chat = this.chats.find((chat) => {
      return (
        (chat.contactId === userId && chat.ownerId === contactId) ||
        (chat.contactId === contactId && chat.ownerId === userId)
      )
    })

    if (chat) {
      throw dispatchError({
        errorType: ErrorType.ERROR,
        message: Messages.CHAT_ALREADY_EXISTS,
        status: Status.BAD_REQUEST,
      })
    }
  }

  setChat(...chats: Chat[]) {
    this.chats.push(...chats)
  }

  resetDB() {
    this.chats = []
  }
}
