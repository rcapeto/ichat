import { Chat, SimpleChat } from '~/entities/app/Chat'
import { Message } from '~/entities/app/Message'

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

export type FindManyChatMessagesRequest = {
  lastMessageId: string
  chatId: string
}

export type FindManyChatMessagesResponse = {
  messages: Message[]
  lastPage: boolean
}
