import { Message } from './Message'
import { User } from './User'

export type Chat = {
  id: string
  createdAt: string
  messages: Message[]
  owner: User
  ownerId: string
  contact: User
  contactId: string
  ownerUnreadCount: number
  contactUnreadCount: number
}

export class ChatEntity {
  constructor(
    public id: string,
    public createdAt: string,
    public messages: Message[],
    public owner: User,
    public ownerId: string,
    public contact: User,
    public contactId: string,
  ) {}
}
