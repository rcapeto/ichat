const doc = '/api-docs'

const auth = {
  login: '/auth/login',
  register: '/auth/register',
}

const appRoutes = {
  logs: '/logs',
  user: {
    findMany: '/users',
    update: '/user',
    updatePassword: '/user/password',
  },
  chat: {
    create: '/chat',
    myChats: '/chats',
    readMessages: '/chat/read-messages',
    findManyMessages: '/chats/:chatId/messages/:lastMessageId',
  },
  message: {
    create: '/message',
  },
}

export const endpoints = {
  doc,
  authentication: auth,
  app: appRoutes,
}
