import { chatRoutes } from '~/routes/app/chat'
import { messagesRoutes } from '~/routes/app/messages'
import { userRoutes } from '~/routes/app/users'
import { authRoutes } from '~/routes/auth'
import { swaggerRoute } from '~/routes/docs/swagger'

export const routes = [
  swaggerRoute,
  authRoutes,
  userRoutes,
  chatRoutes,
  messagesRoutes,
]
