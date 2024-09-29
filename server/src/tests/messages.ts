import { MessageRepository } from '~/app/repositories/messages'
import {
  CreateMessageRequest,
  CreateMessageResponse,
} from '~/app/repositories/messages/types'
import { Chat } from '~/entities/app/Chat'
import { Message } from '~/entities/app/Message'
import { Messages } from '~/messages'
import { dispatchNotFoundError } from '~/utils/dispatchError'
import { makeMessage, makeUser } from './utils'

export class TestMessageRepository implements MessageRepository {
  private chats: Chat[] = []
  private messages: Message[] = []

  async create(request: CreateMessageRequest): Promise<CreateMessageResponse> {
    const { chatId, content, userId, file } = request

    const chat = await this.findChatWithId(chatId)

    const message = makeMessage({
      owner: makeUser({ id: userId }),
      ownerId: userId,
      chatId: chat.id,
      content,
      fileUrl: file,
      read: false,
    })

    this.insertNewMessage(message)

    return {
      message,
      ownerUnreadCount: chat.ownerUnreadCount,
      contactUnreadCount: chat.contactUnreadCount + 1,
      contactId: chat.contactId,
    }
  }

  async findChatWithId(chatId: string) {
    const chat = this.chats.find((chat) => chat.id === chatId)

    if (!chat) {
      throw dispatchNotFoundError(Messages.DOES_NOT_FOUND_CHAT)
    }

    return chat
  }

  insertNewMessage(message: Message) {
    const chat = this.chats.find((chat) => chat.id === message.chatId)

    if (chat) {
      chat.messages.unshift(message)
      this.messages.push(message)
    }
  }

  insertNewChat(...chats: Chat[]) {
    this.chats.push(...chats)
  }

  resetDB() {
    this.chats = []
    this.messages = []
  }
}
