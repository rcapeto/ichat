import { PrismaMessageEntity } from '~/entities/app/PrismaEntities'
import { getCorrectImagePath } from '~/utils/getCorrectImagePath'
import { UserEntity, UserSession } from './User'

export type Message = {
  id: string
  createdAt: string
  content: string
  fileUrl: string | null
  chatId: string | null
  read: boolean
  owner: UserSession
  ownerId: string
}

export class MessageEntity {
  constructor(private message: PrismaMessageEntity) {}

  getMessageFormat(): Message {
    return {
      chatId: this.message.chat_id,
      content: this.message.content,
      createdAt: this.message.created_at.toISOString(),
      fileUrl: getCorrectImagePath({
        imagePath: this.message.file_url,
        folder: 'message',
      }),
      id: this.message.id,
      owner: new UserEntity(this.message.owner).getSession(),
      read: this.message.read,
      ownerId: this.message.owner_id,
    }
  }
}
