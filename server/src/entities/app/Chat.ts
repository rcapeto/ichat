import { PrismaChatEntity } from '~/entities/app/PrismaEntities'
import { Message, MessageEntity } from './Message'
import { UserEntity, UserSession } from './User'

export type Chat = {
  id: string
  createdAt: string
  updatedAt: string
  messages: Message[]
  owner: UserSession
  ownerId: string
  contact: UserSession
  contactId: string
  ownerUnreadCount: number
  contactUnreadCount: number
}

export type SimpleChat = {
  name: string
  id: string
  avatar: string
  notification: number
  messages: Message[]
  updatedAt: string
  chatUserId: string
  createdAt: string
}

export class ChatEntity {
  constructor(private chat: PrismaChatEntity) {}

  getChatFormat(): Chat {
    return {
      contact: new UserEntity(this.chat.contact).getSession(),
      owner: new UserEntity(this.chat.owner).getSession(),
      contactId: this.chat.contact_id,
      contactUnreadCount: this.chat.contact_unread_count,
      createdAt: this.chat.created_at.toISOString(),
      id: this.chat.id,
      messages: (this.chat.messages ?? []).map((message) =>
        new MessageEntity(message).getMessageFormat(),
      ),
      ownerId: this.chat.owner_id,
      ownerUnreadCount: this.chat.owner_unread_count,
      updatedAt: this.chat.updated_at.toISOString(),
    }
  }

  getSimpleChat(loggedUserId: string): SimpleChat {
    const isMe = this.chat.owner_id === loggedUserId
    const chatInfo = isMe ? this.chat.contact : this.chat.owner

    return {
      avatar: chatInfo.profile_image ?? '',
      id: this.chat.id,
      messages: this.chat.messages.map((message) =>
        new MessageEntity(message).getMessageFormat(),
      ),
      name: `${chatInfo.first_name} ${chatInfo.last_name}`,
      chatUserId: chatInfo.id,
      notification: isMe
        ? this.chat.owner_unread_count
        : this.chat.contact_unread_count,
      updatedAt: this.chat.updated_at.toISOString(),
      createdAt: this.chat.created_at.toISOString(),
    }
  }
}
