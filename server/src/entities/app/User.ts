import { PrismaUserEntity } from '~/entities/app/PrismaEntities'
import { PasswordService } from '~/services/password'
import { getCorrectImagePath } from '~/utils/getCorrectImagePath'
import { omit } from '~/utils/omit'
import { Chat } from './Chat'

export type User = {
  firstName: string
  password: string
  lastName: string
  email: string
  profileImage: string | null
  createdAt: string
  id: string
  myChats: Chat[]
  invitedChats: Chat[]
}

export type UserSession = Omit<User, 'password' | 'myChats' | 'invitedChats'>

type ChatsParams = {
  myChats?: Chat[]
  invitedChats?: Chat[]
}

export class UserEntity {
  public firstName: string
  public password: string
  public lastName: string
  public email: string
  public profileImage: string | null
  public createdAt: string
  public id: string
  public myChats: Chat[]
  public invitedChats: Chat[]

  constructor(data: PrismaUserEntity, chatParams: ChatsParams = {}) {
    this.firstName = data.first_name
    this.lastName = data.last_name
    this.password = data.password
    this.email = data.email
    this.profileImage = data.profile_image
    this.id = data.id
    this.myChats = chatParams.myChats
    this.invitedChats = chatParams.invitedChats
    this.createdAt = data.created_at.toISOString()
  }

  getSession(): UserSession {
    return {
      ...omit(this, ['password']),
      profileImage: getCorrectImagePath({
        folder: 'users',
        imagePath: this.profileImage,
      }),
    }
  }

  async isSamePassword(password: string) {
    return await PasswordService.checkPassword({
      encryptedPassword: this.password,
      password,
    })
  }
}
