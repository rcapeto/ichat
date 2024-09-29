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
import { client } from '~/database/client'
import { ChatEntity } from '~/entities/app/Chat'
import { MessageEntity } from '~/entities/app/Message'
import { PrismaChatEntity } from '~/entities/app/PrismaEntities'
import { ErrorType } from '~/enums/errorType'
import { Status } from '~/enums/status'
import { Messages } from '~/messages'
import { dispatchError, dispatchNotFoundError } from '~/utils/dispatchError'

export class DatabaseChatRepository implements ChatRepository {
  private maxMessagesPerPage = 20

  async findManyChatMessages(
    request: FindManyChatMessagesRequest,
  ): Promise<FindManyChatMessagesResponse> {
    const { chatId, lastMessageId } = request

    const [chat, lastMessage] = await Promise.all([
      this.findChatById(chatId),
      this.findMessageById(lastMessageId),
    ])

    const messages = await client.message.findMany({
      where: {
        chat_id: chat.id,
        AND: [
          {
            created_at: {
              lt: lastMessage.created_at,
            },
          },
        ],
      },
      include: {
        chat: true,
        owner: true,
      },
      take: this.maxMessagesPerPage,
      orderBy: {
        created_at: 'desc',
      },
    })

    return {
      lastPage: messages.length < this.maxMessagesPerPage,
      messages: messages.map((message) =>
        new MessageEntity(message).getMessageFormat(),
      ),
    }
  }

  async readAllMessages(
    request: ReadAllChatMessagesRequest,
  ): Promise<ReadAllChatMessagesResponse> {
    const { chatId, userId } = request

    const chat = await this.findChatById(chatId)

    const usersInChat = [chat.owner_id, chat.contact_id]

    if (!usersInChat.includes(userId)) {
      throw dispatchError({
        errorType: ErrorType.ERROR,
        message: Messages.ERROR_READ_MESSAGES,
        status: Status.BAD_REQUEST,
      })
    }

    const loggedUserIsOwner = userId === chat.owner_id
    const loggedUserIsContact = userId === chat.contact_id

    await client.chat.update({
      where: {
        id: chat.id,
      },
      data: {
        contact_unread_count: loggedUserIsContact
          ? 0
          : chat.contact_unread_count,
        owner_unread_count: loggedUserIsOwner ? 0 : chat.owner_unread_count,
      },
    })

    await client.message.updateMany({
      where: {
        chat_id: chat.id,
        AND: [
          {
            owner_id: {
              not: userId,
            },
          },
        ],
      },
      data: {
        read: true,
      },
    })

    return {
      chatId: chat.id,
      contactId: chat.contact_id,
      ownerId: chat.owner_id,
    }
  }

  async findMyChats(request: FindMyChatsRequest): Promise<FindMyChatsResponse> {
    const { userId } = request

    const chats = await client.chat.findMany({
      where: {
        OR: [
          {
            contact_id: userId,
          },
          {
            owner_id: userId,
          },
        ],
      },
      orderBy: {
        updated_at: 'asc',
      },
      include: {
        messages: {
          include: {
            owner: true,
            chat: true,
          },
          orderBy: {
            created_at: 'desc',
          },
          take: this.maxMessagesPerPage,
        },
        owner: true,
        contact: true,
      },
    })

    return {
      chats: chats.map((chat) =>
        new ChatEntity(chat as PrismaChatEntity).getSimpleChat(userId),
      ),
    }
  }

  async create(request: CreateChatRequest): Promise<CreateChatResponse> {
    const { contactId, userId } = request

    await Promise.all([this.checkChatExists(userId, contactId)])

    const dbChat = await client.chat.create({
      data: {
        contact_unread_count: 0,
        owner_unread_count: 0,
        owner_id: userId,
        contact_id: contactId,
      },
      include: {
        owner: true,
        messages: true,
        contact: true,
      },
    })

    const chatEntity = new ChatEntity(dbChat as PrismaChatEntity)

    return { chat: chatEntity.getChatFormat() }
  }

  async findChatById(chatId: string) {
    const chat = await client.chat.findUnique({
      where: {
        id: chatId,
      },
    })

    if (!chat) {
      throw dispatchNotFoundError(Messages.DOES_NOT_FOUND_CHAT)
    }

    return chat
  }

  async checkChatExists(userId: string, contactId: string) {
    const chat = await client.chat.findFirst({
      where: {
        OR: [
          {
            owner_id: userId,
            contact_id: contactId,
          },
          {
            owner_id: contactId,
            contact_id: userId,
          },
        ],
      },
    })

    if (chat) {
      throw dispatchError({
        errorType: ErrorType.ERROR,
        message: Messages.CHAT_ALREADY_EXISTS,
        status: Status.BAD_REQUEST,
      })
    }
  }

  async findMessageById(messageId: string) {
    const message = await client.message.findUnique({
      where: {
        id: messageId,
      },
    })

    if (!message) {
      throw dispatchNotFoundError(Messages.DOES_NOT_FOUND_MESSAGE)
    }

    return message
  }
}
