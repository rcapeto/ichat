import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'node:path'

import { serverConfig } from '~/config/server'
import { routes } from '~/routes'

const SERVER_PORT = serverConfig.PORT

dotenv.config()

const server = express()
const uploadsPaths = Object.values(serverConfig.uploadFolders)

server.use(
  cors({
    exposedHeaders: [serverConfig.headers.totalPages],
  }),
)
server.use(express.json())

for (const uploadPath of uploadsPaths) {
  const staticPath = express.static(path.join(__dirname, '..', uploadPath))
  const formattedUploadPath = `/${uploadPath}`

  server.use(formattedUploadPath, staticPath)
}

for (const route of routes) {
  const apiVersion = serverConfig.version

  server.use(`/${apiVersion}`, route)
}

server.listen(SERVER_PORT, () => {
  console.log(`
   ================================================
   Server is running in: http://localhost:${SERVER_PORT}
   ================================================
         `)
})
