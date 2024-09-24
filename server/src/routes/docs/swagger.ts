import { Router } from 'express'
import swaggerUI from 'swagger-ui-express'
import { endpoints } from '~/routes/endpoints'
import { swaggerConfig } from '~/docs/swagger'

export const swaggerRoute = Router()
const routePath = endpoints.doc

swaggerRoute.use(routePath, swaggerUI.serve, swaggerUI.setup(swaggerConfig))
