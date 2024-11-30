import { Socket } from 'socket.io'
import { SetOnlineUserParams } from './types'

export class SocketInstance {
  private static INSTANCE: SocketInstance
  private socket: Socket | null = null
  private onlineUsers = new Map<string, string>() // userId, socket.id

  private constructor() {}

  public static getInstance() {
    if (!this.INSTANCE) {
      this.INSTANCE = new SocketInstance()
    }

    return this.INSTANCE
  }

  setSocket(socket: Socket) {
    this.socket = socket
  }

  getSocket(): Socket | null {
    return this.socket
  }

  setOnlineUser({ socketId, userId }: SetOnlineUserParams) {
    this.onlineUsers.set(userId, socketId)
  }

  getUsers(): string[] {
    return Array.from(this.onlineUsers.keys())
  }

  getSocketIdByUserId(userId: string): string {
    return this.onlineUsers.get(userId)
  }

  removeOnlineUserById(userId: string) {
    this.onlineUsers.delete(userId)
  }
}

export const socketInstance = SocketInstance.getInstance()
