import { AddNewUsers } from "@/components/add-new-users";
import { useAppDispatch } from "@/hooks/use-dispatch";
import { useModal } from "@/hooks/use-modal";
import { useAppSelector } from "@/hooks/use-selector";
import { socket, SocketEvents } from "@/services/socket";
import {
  UserDisconnectSocketEventParams,
  UserOnlineSocketEventParams,
} from "@/services/socket/payload";
import { chatActions } from "@/store/app/chat";
import {
  InsertNewChat,
  InsertNewMessage,
  SelectChat,
  UpdateReadMessages,
} from "@/store/app/chat/types";
import { createContext, PropsWithChildren, useEffect } from "react";
import { ChatContextValues } from "./types";

export const ChatContext = createContext({} as ChatContextValues);

export function ChatProvider(props: PropsWithChildren) {
  const dispatch = useAppDispatch();
  const { auth, chat } = useAppSelector((state) => ({
    ...state.auth,
    chat: state.chat,
  }));
  const { closeModal, showModal } = useModal();

  function addNewChat(params: InsertNewChat) {
    dispatch(chatActions.insertNewChat(params));
  }

  function addNewMessage(params: InsertNewMessage) {
    dispatch(chatActions.insertNewMessage(params));
  }

  function selectChat(params: SelectChat) {
    dispatch(chatActions.selectChat(params));
  }

  function updateUnreadMessages(params: UpdateReadMessages) {
    dispatch(chatActions.updateReadMessages(params));
  }

  function addSocketListeners() {
    socket.emit(SocketEvents.USER_ONLINE, {
      userId: auth.payload?.session.id ?? "",
    } as UserOnlineSocketEventParams);
  }

  function disconnectChat() {
    socket.emit(SocketEvents.USER_DISCONNECT, {
      userId: auth.payload?.session.id ?? "",
    } as UserDisconnectSocketEventParams);

    socket.disconnect();
  }

  function showUsersModal() {
    showModal({
      title: "Nova conversa",
      Component: AddNewUsers,
      passProps: {
        onClose: closeModal,
      },
    });
  }

  useEffect(() => {
    addSocketListeners();
  }, []);

  return (
    <ChatContext.Provider
      value={{
        addNewChat,
        addNewMessage,
        selectChat,
        updateUnreadMessages,
        disconnectChat,
        showUsersModal,
        userId: auth.payload?.session.id ?? "",
        ...chat,
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
}
