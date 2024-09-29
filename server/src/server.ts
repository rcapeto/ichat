import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import path from 'node:path'
import { Server as SocketServer } from 'socket.io'

import { serverConfig } from '~/config/server'
import { routes } from '~/routes'
import {
  SocketEvents,
  UserDisconnectSocketEventParams,
  UserOnlineSocketEventParams,
} from '~/services/socket'
import { socketInstance } from '~/services/socket/socket-instance'

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

const origin = `http://localhost:${SERVER_PORT}`

const httpServer = server.listen(SERVER_PORT, () => {
  console.log(`
   ================================================
   Server is running in: ${origin}
   ================================================
`)
})

const io = new SocketServer(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
  },
})

io.on(SocketEvents.CONNECTION, (socket) => {
  socketInstance.setSocket(socket)

  io.on(SocketEvents.USER_ONLINE, (data: UserOnlineSocketEventParams) => {
    socketInstance.setOnlineUser({
      socketId: socket.id,
      userId: data.userId,
    })
  })

  io.on(
    SocketEvents.USER_DISCONNECT,
    (data: UserDisconnectSocketEventParams) => {
      socketInstance.removeOnlineUserById(data.userId)
    },
  )
})
