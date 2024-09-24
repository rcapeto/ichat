import { Router } from 'express'
import { endpoints } from '~/routes/endpoints'

import { login } from './login'

const authEndpoints = endpoints.authentication

export const authRoutes = Router()

authRoutes.post(authEndpoints.login, login)
