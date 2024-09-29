import { MessageRepository } from '~/app/repositories/messages'
import {
  CreateMessageRequest,
  CreateMessageResponse,
} from '~/app/repositories/messages/types'
import { client } from '~/database/client'
import { MessageEntity } from '~/entities/app/Message'
import { Messages } from '~/messages'
import { dispatchNotFoundError } from '~/utils/dispatchError'

export class DatabaseMessageRepository implements MessageRepository {
  async create(request: CreateMessageRequest): Promise<CreateMessageResponse> {
    const { chatId, content, userId, file } = request

    const chat = await this.findChatWithId(chatId)
    const message = await client.message.create({
      data: {
        content,
        chat_id: chat.id,
        file_url: file,
        owner_id: userId,
      },
      include: {
        chat: true,
        owner: true,
      },
    })

    const contactUnreadCount = chat.contact_unread_count + 1
    const ownerUnreadCount = chat.owner_unread_count

    await client.chat.update({
      where: {
        id: chat.id,
      },
      data: {
        owner_unread_count: ownerUnreadCount,
        contact_unread_count: contactUnreadCount,
        updated_at: new Date(),
      },
    })

    return {
      contactUnreadCount,
      ownerUnreadCount,
      message: new MessageEntity(message).getMessageFormat(),
      contactId: chat.contact_id,
    }
  }

  async findChatWithId(chatId: string) {
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
}
