import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import path from 'node:path'

import { serverConfig } from '~/config/server'
import { routes } from '~/routes'
import {
  SocketEvents,
  UserDisconnectSocketEventParams,
  UserOnlineSocketEventParams,
  io,
  server,
  socketInstance,
} from '~/services/socket'

dotenv.config()

const uploadsPaths = Object.values(serverConfig.uploadFolders)

server.use(
  cors({
    exposedHeaders: [serverConfig.headers.totalPages],
  }),
)
server.use(express.json())

io.on(SocketEvents.CONNECTION, (socket) => {
  socket.on(SocketEvents.USER_ONLINE, (data: UserOnlineSocketEventParams) => {
    socketInstance.setOnlineUser({
      socketId: socket.id,
      userId: data.userId,
    })

    socket.join(data.userId)

    io.emit(SocketEvents.UPDATE_ONLINE_USERS, {
      onlineUsers: socketInstance.getUsers(),
    })
  })

  socket.on(
    SocketEvents.USER_DISCONNECT,
    (data: UserDisconnectSocketEventParams) => {
      socketInstance.removeOnlineUserById(data.userId)

      io.emit(SocketEvents.UPDATE_ONLINE_USERS, {
        onlineUsers: socketInstance.getUsers(),
      })
    },
  )
})

for (const uploadPath of uploadsPaths) {
  const staticPath = express.static(path.join(__dirname, '..', uploadPath))
  const formattedUploadPath = `/${uploadPath}`

  server.use(formattedUploadPath, staticPath)
}

for (const route of routes) {
  const apiVersion = serverConfig.version

  server.use(`/${apiVersion}`, route)
}
