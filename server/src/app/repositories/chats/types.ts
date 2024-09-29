import { Chat, SimpleChat } from '~/entities/app/Chat'

export type CreateChatRequest = {
  contactId: string
  userId: string
}

export type CreateChatResponse = {
  chat: Chat
}

export type FindMyChatsRequest = {
  userId: string
}

export type FindMyChatsResponse = {
  chats: SimpleChat[]
}

export type ReadAllChatMessagesRequest = {
  userId: string
  chatId: string
}

export type ReadAllChatMessagesResponse = {
  chatId: string
  contactId: string
  ownerId: string
}
