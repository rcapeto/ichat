import { FlatList } from "@/components/flat-list";
import { useChat } from "@/hooks/use-chat";
import { useAppDispatch } from "@/hooks/use-dispatch";
import {
  handleGetMessagesChat,
  handleReadChatMessages,
} from "@/store/app/chat/requests";
import { useEffect, useState } from "react";
import { AddNewUsers } from "../add-new-users";
import { EmptyState } from "./EmptyState";
import { Header } from "./Header";
import { Keyboard } from "./Keyboard";
import { Message } from "./message";

export function ChatContent() {
  const [isLastPage, setIsLastPage] = useState(false);

  const { selectedChat, addNewMessages, isVisibleAddUserPage } = useChat();
  const dispatch = useAppDispatch();

  async function handleReadMessages() {
    if (!selectedChat) {
      return;
    }

    await dispatch(handleReadChatMessages({ chatId: selectedChat.id }));
  }

  async function getOldMessage() {
    const lastMessage = messages[messages.length - 1];
    const chatId = selectedChat?.id;

    if (lastMessage && chatId && !isLastPage) {
      const response = await dispatch(
        handleGetMessagesChat({
          chatId,
          lastMessageId: lastMessage.id,
        })
      );
      const isSuccess = !handleGetMessagesChat.rejected.match(response);

      if (isSuccess) {
        setIsLastPage(response.payload.lastPage);

        addNewMessages({
          chatId,
          messages: response.payload.messages,
          isOldMessage: true,
        });
      }
    }
  }

  useEffect(() => {
    handleReadMessages();
  }, [selectedChat?.id, selectedChat?.messages.length]);

  if (isVisibleAddUserPage) {
    return <AddNewUsers />;
  }

  if (!selectedChat) {
    return <EmptyState />;
  }

  const messages = selectedChat.messages;

  return (
    <FlatList
      data={messages}
      keyExtractor={(data) => data.id}
      renderItem={({ item: message }) => <Message message={message} />}
      HeaderComponent={<Header />}
      FooterComponent={<Keyboard />}
      reverse
      scrollClassName="p-5 gap-6"
      containerClassName="gap-0"
      onEndReached={getOldMessage}
    />
  );
}
