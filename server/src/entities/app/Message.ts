// eslint-disable-next-line prettier/prettier
import { Chat } from "./Chat";

export type Message = {
  id: string
  createdAt: string
  content: string
  type: string
  fileUrl: string | null
  chat: Chat | null
  chatId: string | null
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
  ) {}
}
