import { Chat } from '~/entities/app/Chat'
import { Message } from '~/entities/app/Message'

export type SetOnlineUserParams = {
  socketId: string
  userId: string
}

export type UserOnlineSocketEventParams = {
  userId: string
}

export type UserDisconnectSocketEventParams = {
  userId: string
}

export type CreateChatSocketEventResponse = {
  chat: Chat
}

export type CreateMessageSocketEventResponse = {
  message: Message
  contactUnreadCount: number
  ownerUnreadCount: number
  contactId: string
}

export type ReadChatMessagesSocketEventResponse = {
  chatId: string
  userReadMessagesId: string
}
