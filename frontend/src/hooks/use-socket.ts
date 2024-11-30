import { socket, SocketEvents } from "@/services/socket";
import { GetOnlineSocketUsersResponse, UserDisconnectSocketEventParams, UserOnlineSocketEventParams } from "@/services/socket/payload";
import { chatActions } from "@/store/app/chat";
import { useAppDispatch } from "./use-dispatch";

export function useSocket() {
   const dispatch = useAppDispatch()

   function disconnectSocket() {
      socket.disconnect()
   }

   function onUpdateOnlineUsersEvent() {
      socket.on(SocketEvents.UPDATE_ONLINE_USERS, (data: GetOnlineSocketUsersResponse) => {
         dispatch(chatActions.updateOnlineUsers({ onlineUsers: data.onlineUsers }))
       });
   }

   function connectSocketUser(userId: string) {
      const params: UserOnlineSocketEventParams = { userId }
      socket.emit(SocketEvents.USER_ONLINE, params);
   }

   function disconnectSocketUser(userId: string) {
      const params: UserDisconnectSocketEventParams = { userId }

      socket.emit(SocketEvents.USER_DISCONNECT, params);
   }

   return {
      socket,
      disconnectSocket,
      disconnectSocketUser,
      connectSocketUser,
      onUpdateOnlineUsersEvent,
   }
}