import { Chat } from '~/entities/app/Chat'
import { Logger } from '~/entities/app/Logger'
import { Message } from '~/entities/app/Message'
import { User, UserSession } from '~/entities/app/User'
import { APILoggerType } from '~/enums/apiLoggerType'
import { createRandomUUID } from '~/utils/createRandomUUID'

export const SECRET_PASSWORD = '@SecretPassword123'

export function makeLog(partial: Partial<Logger> = {}): Logger {
  return {
    createdAt: new Date().toISOString(),
    action: 'any-action',
    id: createRandomUUID(),
    payload: 'any-payload',
    type: APILoggerType.SUCCESS,
    ...partial,
  }
}

export function makeUser(partial: Partial<User> = {}): User {
  return {
    createdAt: new Date().toISOString(),
    email: 'fake-email@email.com',
    firstName: 'John',
    lastName: 'Doe',
    id: createRandomUUID(),
    invitedChats: [],
    myChats: [],
    profileImage: null,
    password: SECRET_PASSWORD,
    ...partial,
  }
}

export function makeChat(partial: Partial<Chat> = {}): Chat {
  const contact = makeUser()
  const owner = makeUser()

  return {
    contact,
    owner,
    contactId: contact.id,
    ownerId: owner.id,
    createdAt: new Date().toISOString(),
    id: createRandomUUID(),
    messages: [],
    contactUnreadCount: 0,
    ownerUnreadCount: 0,
    updatedAt: new Date().toISOString(),
    ...partial,
  }
}

export function makeMessage(partial: Partial<Message> = {}): Message {
  const chat = makeChat()
  const owner = makeUser()

  return {
    createdAt: new Date().toISOString(),
    id: createRandomUUID(),
    chatId: chat.id,
    content: 'any-content',
    fileUrl: null,
    read: false,
    owner,
    ownerId: owner.id,
    ...partial,
  }
}

export function makeUserSession(partial?: Partial<UserSession>): UserSession {
  const user = makeUser()

  return {
    createdAt: user.createdAt,
    email: user.email,
    firstName: user.firstName,
    id: user.id,
    lastName: user.lastName,
    profileImage: user.profileImage ?? '',
    ...partial,
  }
}
