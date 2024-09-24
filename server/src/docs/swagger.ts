import { JsonObject } from 'swagger-ui-express'

import { serverConfig } from '~/config/server'
import { APIErrorSchema } from '~/docs/components'

import auth from '~/docs/routes/auth'

const SERVER_PORT = serverConfig.PORT

export const swaggerConfig: JsonObject = {
  openapi: '3.1.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0',
    contact: {
      email: 'raphael.capeto@ifood.com',
    },
    servers: [
      {
        url: `http://localhost:${SERVER_PORT}`,
      },
    ],
  },
  paths: {
    ...auth.paths,
  },
  components: {
    schemas: {
      APIErrorSchema,
      ...auth.schemas,
    },
  },
}
