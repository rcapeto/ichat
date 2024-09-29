import { Router } from 'express'
import { ensureUserIsAuthenticated } from '~/middlewares/ensureUserIsAuthenticated'
import { endpoints } from '~/routes/endpoints'
import { create } from './create'
import { findMyChats } from './findMyChats'

const chatEndpoints = endpoints.app.chat
export const chatRoutes = Router()

chatRoutes.post(chatEndpoints.create, ensureUserIsAuthenticated, create)
chatRoutes.get(chatEndpoints.myChats, ensureUserIsAuthenticated, findMyChats)
