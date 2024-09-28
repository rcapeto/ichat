import { Chat } from '~/entities/app/Chat'

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
