import { useAccount } from "@/hooks/use-account";
import { useAlert } from "@/hooks/use-alert";
import { useAppDispatch } from "@/hooks/use-dispatch";
import { useAppSelector } from "@/hooks/use-selector";
import { useSocket } from "@/hooks/use-socket";
import { useWindowFocus } from "@/hooks/use-window-focus";
import { Messages } from "@/messages";
import { SocketEvents } from "@/services/socket";
import {
  CreateChatSocketEventResponse,
  CreateMessageSocketEventResponse,
  ReadChatMessagesSocketEventResponse,
} from "@/services/socket/payload";
import { chatActions } from "@/store/app/chat";
import { handleGetMyChats } from "@/store/app/chat/requests";
import {
  InsertNewChat,
  InsertNewMessage,
  SelectChat,
  UpdateReadMessages,
} from "@/store/app/chat/types";
import { getFormattedMessage } from "@/utils/get-formatted-message";
import { joinWords } from "@/utils/join-words";
import { simplifyChat } from "@/utils/simplify-chat";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { ChatContextValues } from "./types";

export const ChatContext = createContext({} as ChatContextValues);

export function ChatProvider(props: PropsWithChildren) {
  const [isVisibleAddUserPage, setIsVisibleAddUserPage] = useState(false);

  const dispatch = useAppDispatch();
  const { session } = useAccount();
  const { showSonner } = useAlert();
  const { isFocused } = useWindowFocus();

  const {
    disconnectSocketUser,
    connectSocketUser,
    onUpdateOnlineUsersEvent,
    socket,
  } = useSocket();

  const chat = useAppSelector((state) => state.chat);

  function showAddUserPage() {
    setIsVisibleAddUserPage(true);
  }

  function hideAddUserPage() {
    setIsVisibleAddUserPage(false);
  }

  function addNewChat(params: InsertNewChat) {
    dispatch(chatActions.insertNewChat(params));
  }

  function addNewMessages(params: InsertNewMessage) {
    dispatch(chatActions.insertNewMessage(params));
  }

  function selectChat(params: SelectChat) {
    dispatch(chatActions.selectChat(params));
  }

  function updateUnreadMessages(params: UpdateReadMessages) {
    dispatch(chatActions.updateReadMessages(params));
  }

  function onListenChatEvents() {
    socket.on(
      SocketEvents.CREATE_CHAT,
      ({ chat }: CreateChatSocketEventResponse) => {
        if (session?.id) {
          dispatch(
            chatActions.insertNewChat({
              chat: simplifyChat({ chat, loggedUserId: session?.id }),
            })
          );
        }
      }
    );

    socket.on(
      SocketEvents.MESSAGE,
      ({ message }: CreateMessageSocketEventResponse) => {
        dispatch(
          chatActions.insertNewMessage({
            chatId: message.chatId,
            messages: [message],
          })
        );

        if (
          chat.selectedChat?.id !== message.chatId &&
          message.ownerId !== session?.id
        ) {
          const fullName = joinWords(
            message.owner.firstName,
            message.owner.lastName
          );
          const messageTitle = Messages.NEW_MESSAGE(fullName);
          const messageContent = getFormattedMessage(message.content);

          showSonner(messageTitle, {
            description: messageContent,
            action: {
              label: "Ver",
              onClick: () => {
                selectChat({ chatId: message.chatId });
              },
            },
          });

          if (!isFocused) {
            const notification = new Notification(messageTitle, {
              body: messageContent,
              icon: message.owner.profileImage ?? "",
            });

            notification.onclick = () => {
              selectChat({ chatId: message.chatId });
            };
          }
        }
      }
    );

    socket.on(
      SocketEvents.USER_READ_MESSAGE,
      (data: ReadChatMessagesSocketEventResponse) => {
        console.log("@@ update user read", data);

        updateUnreadMessages({
          chatId: data.chatId,
          userReadMessagesId: data.userReadMessagesId,
        });
      }
    );
  }

  function addSocketListeners() {
    if (session?.id) {
      connectSocketUser(session.id);
      onUpdateOnlineUsersEvent();
      onListenChatEvents();
    }
  }

  function disconnectChat() {
    if (session?.id) {
      disconnectSocketUser(session.id);
    }
  }

  function getUserChats() {
    dispatch(handleGetMyChats());
  }

  async function requestNotificationAuthorization() {
    return await Notification.requestPermission();
  }

  useEffect(() => {
    if (session?.id) {
      requestNotificationAuthorization();
      addSocketListeners();
      getUserChats();
    }
  }, [session?.id]);

  return (
    <ChatContext.Provider
      value={{
        addNewChat,
        addNewMessages,
        selectChat,
        updateUnreadMessages,
        disconnectChat,
        userId: session?.id ?? "",
        isVisibleAddUserPage,
        showAddUserPage,
        hideAddUserPage,
        ...chat,
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
}
