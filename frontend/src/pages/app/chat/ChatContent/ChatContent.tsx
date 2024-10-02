import { FlatList } from "@/components/flat-list";
import { useChat } from "@/hooks/use-chat";
import { EmptyState } from "./EmptyState";
import { Header } from "./Header";
import { Keyboard } from "./Keyboard";
import { Message } from "./Message";

export function ChatContent() {
  const { selectedChat } = useChat();

  if (!selectedChat) {
    return <EmptyState />;
  }

  return (
    <FlatList
      data={selectedChat.messages}
      keyExtractor={(data) => data.id}
      renderItem={({ item: message }) => <Message message={message} />}
      HeaderComponent={() => <Header />}
      FooterComponent={() => <Keyboard />}
      reverse
      scrollClassName="p-4 gap-6"
    />
  );
}
