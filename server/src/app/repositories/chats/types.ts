import { Chat } from '~/entities/app/Chat'

export type CreateChatRequest = {
  contactId: string
  userId: string
}

export type CreateChatResponse = {
  chat: Chat
}
