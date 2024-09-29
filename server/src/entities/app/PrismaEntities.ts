import { Chat, Message, User } from '@prisma/client'

export type PrismaUserEntity = User & {
  my_chats?: PrismaChatEntity[]
  invited_chats?: PrismaChatEntity[]
  messages?: PrismaMessageEntity[]
}

export type PrismaMessageEntity = Message & {
  chat?: PrismaChatEntity
  chat_id?: string
  owner: PrismaUserEntity
  owner_id: string
}

export type PrismaChatEntity = Chat & {
  owner?: PrismaUserEntity
  owner_id?: string
  contact?: PrismaUserEntity
  contact_id?: string
  messages?: PrismaMessageEntity[]
}
