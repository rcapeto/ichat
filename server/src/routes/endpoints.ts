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
  },
}

export const endpoints = {
  doc,
  authentication: auth,
  app: appRoutes,
}
