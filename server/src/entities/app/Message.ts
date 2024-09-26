import { Chat } from './Chat'

export type Message = {
  id: string
  createdAt: string
  content: string
  type: string
  fileUrl: string | null
  chat: Chat | null
  chatId: string | null
  read: boolean
}

export class MessageEntity {
  constructor(
    public id: string,
    public createdAt: string,
    public content: string,
    public type: string,
    public fileUrl: string | null,
    public chat: Chat | null,
    public chatId: string | null,
    public readed: boolean,
  ) {}
}
