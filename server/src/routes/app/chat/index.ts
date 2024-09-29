import { Router } from 'express'
import { ensureUserIsAuthenticated } from '~/middlewares/ensureUserIsAuthenticated'
import { endpoints } from '~/routes/endpoints'
import { create } from './create'
import { findMyChats } from './findMyChats'
import { readMessages } from './readMessages'

const chatEndpoints = endpoints.app.chat
export const chatRoutes = Router()

chatRoutes.post(chatEndpoints.create, ensureUserIsAuthenticated, create)
chatRoutes.get(chatEndpoints.myChats, ensureUserIsAuthenticated, findMyChats)
chatRoutes.put(
  chatEndpoints.readMessages,
  ensureUserIsAuthenticated,
  readMessages,
)
