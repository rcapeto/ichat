import { ChatRepository } from '~/app/repositories/chats'
import {
  CreateChatRequest,
  CreateChatResponse,
  FindManyChatMessagesRequest,
  FindManyChatMessagesResponse,
  FindMyChatsRequest,
  FindMyChatsResponse,
  ReadAllChatMessagesRequest,
  ReadAllChatMessagesResponse,
} from '~/app/repositories/chats/types'
import { Chat } from '~/entities/app/Chat'
import { ErrorType } from '~/enums/errorType'
import { Status } from '~/enums/status'
import { Messages } from '~/messages'
import { dispatchError, dispatchNotFoundError } from '~/utils/dispatchError'
import { makeChat } from './utils'

export class TestChatRepository implements ChatRepository {
  private chats: Chat[] = []
  private maxMessagesPerPage = 20

  async findManyChatMessages(
    request: FindManyChatMessagesRequest,
  ): Promise<FindManyChatMessagesResponse> {
    const { chatId, lastMessageId } = request
    const chat = await this.findChatById(chatId)

    const chatMessages = await this.getChatMessagesById(chat.id)

    const lastMessageIndex = chatMessages
      .reverse()
      .findIndex((message) => message.id === lastMessageId)

    if (lastMessageIndex === -1) {
      throw dispatchNotFoundError(Messages.DOES_NOT_FOUND_MESSAGE)
    }

    const count = await this.countMessagesInChat(chat.id)
    const lastIndex =
      count - lastMessageIndex > this.maxMessagesPerPage
        ? this.maxMessagesPerPage
        : count - lastMessageIndex

    const messages = chatMessages.slice(
      lastMessageIndex + 1,
      lastMessageIndex + lastIndex,
    )

    return {
      lastPage: messages.length < this.maxMessagesPerPage,
      messages,
    }
  }

  async countMessagesInChat(chatId: string) {
    const chat = await this.findChatById(chatId)
    return chat.messages.length
  }

  async getChatMessagesById(chatId: string) {
    const chat = await this.findChatById(chatId)
    const messages = chat.messages.reverse()

    return messages
  }

  async readAllMessages(
    request: ReadAllChatMessagesRequest,
  ): Promise<ReadAllChatMessagesResponse> {
    const { chatId, userId } = request

    const chat = await this.findChatById(chatId)

    if (!chat) {
      throw dispatchNotFoundError(Messages.DOES_NOT_FOUND_CHAT)
    }

    const usersInChat = [chat.ownerId, chat.contactId]

    if (!usersInChat.includes(userId)) {
      throw dispatchError({
        errorType: ErrorType.ERROR,
        message: Messages.ERROR_READ_MESSAGES,
        status: Status.BAD_REQUEST,
      })
    }

    chat.messages = chat.messages.map((message) => ({
      ...message,
      read: message.ownerId !== userId,
    }))

    return {
      chatId: chat.id,
      contactId: chat.contactId,
      ownerId: chat.ownerId,
    }
  }

  async findMyChats(request: FindMyChatsRequest): Promise<FindMyChatsResponse> {
    const { userId } = request

    const chats = this.chats.filter((chat) => {
      const ids = [chat.ownerId, chat.contactId]

      return ids.includes(userId)
    })

    return {
      chats: chats.map((chat) => {
        const isMe = chat.ownerId === userId
        const chatInfo = isMe ? chat.contact : chat.owner

        return {
          avatar: chatInfo.profileImage,
          id: chat.id,
          messages: chat.messages.reverse().slice(0, 20),
          name: `${chatInfo.firstName} ${chatInfo.lastName}`,
          notification: isMe ? chat.contactUnreadCount : chat.ownerUnreadCount,
          updatedAt: chat.updatedAt,
        }
      }),
    }
  }

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

  async findChatById(chatId: string) {
    const chat = this.chats.find((chat) => chat.id === chatId)
    return chat
  }

  setChat(...chats: Chat[]) {
    this.chats.push(...chats)
  }

  resetDB() {
    this.chats = []
  }
}
