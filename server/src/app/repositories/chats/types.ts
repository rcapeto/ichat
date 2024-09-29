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
