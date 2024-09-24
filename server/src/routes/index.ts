import { authRoutes } from '~/routes/auth'
import { swaggerRoute } from '~/routes/docs/swagger'

export const routes = [swaggerRoute, authRoutes]
