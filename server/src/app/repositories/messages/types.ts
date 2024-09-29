import { Message } from '~/entities/app/Message'

export type CreateMessageRequest = {
  userId: string
  file?: string
  content: string
  chatId: string
}

export type CreateMessageResponse = {
  message: Message
  contactUnreadCount: number
  ownerUnreadCount: number
  contactId: string
}
