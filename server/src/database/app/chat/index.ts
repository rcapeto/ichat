import { ChatRepository } from '~/app/repositories/chats'
import {
  CreateChatRequest,
  CreateChatResponse,
} from '~/app/repositories/chats/types'
import { client } from '~/database/client'
import { ChatEntity } from '~/entities/app/Chat'
import { PrismaChatEntity } from '~/entities/app/PrismaEntities'
import { ErrorType } from '~/enums/errorType'
import { Status } from '~/enums/status'
import { Messages } from '~/messages'
import { dispatchError } from '~/utils/dispatchError'

export class DatabaseChatRepository implements ChatRepository {
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
}
