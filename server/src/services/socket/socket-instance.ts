import { Socket } from 'socket.io'

export class SocketInstance {
  private static INSTANCE: SocketInstance
  public socket: Socket
  public onlineUsers = new Map<string, string>() // userId, socket.id

  private constructor(newSocket: Socket) {
    this.socket = newSocket
  }

  public static getInstance(newSocket: Socket) {
    if (!this.INSTANCE) {
      this.INSTANCE = new SocketInstance(newSocket)
    }

    return this.INSTANCE
  }
}
