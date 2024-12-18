import { Router } from 'express'
import { endpoints } from '~/routes/endpoints'

import { login } from './login'
import { register } from './register'
import { session } from './session'

const authEndpoints = endpoints.authentication

export const authRoutes = Router()

authRoutes.post(authEndpoints.login, login)
authRoutes.post(authEndpoints.register, register)
authRoutes.get(authEndpoints.session, session)
