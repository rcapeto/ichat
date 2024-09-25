import { Router } from 'express'
import { ensureUserIsAuthenticated } from '~/middlewares/ensureUserIsAuthenticated'
import { endpoints } from '~/routes/endpoints'
import { findMany } from './findMany'

const userEndpoints = endpoints.app.user

export const userRoutes = Router()

userRoutes.get(userEndpoints.findMany, ensureUserIsAuthenticated, findMany)
