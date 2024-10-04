import express from 'express'
import { Server as SocketServer } from 'socket.io'
import { serverConfig } from '~/config/server'

export const server = express()

const SERVER_PORT = serverConfig.PORT

const origin = `http://localhost:${SERVER_PORT}`

const httpServer = server.listen(SERVER_PORT, () => {
  console.log(`
   ================================================
   Server is running in: ${origin}
   ================================================
`)
})

export const io = new SocketServer(httpServer, {
  cors: {
    origin: 'http://localhost:3001',
  },
})
