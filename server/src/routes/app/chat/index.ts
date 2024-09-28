import { Router } from 'express'
import { ensureUserIsAuthenticated } from '~/middlewares/ensureUserIsAuthenticated'
import { endpoints } from '~/routes/endpoints'
import { create } from './create'

const chatEndpoints = endpoints.app.chat
export const chatRoutes = Router()

chatRoutes.post(chatEndpoints.create, ensureUserIsAuthenticated, create)
