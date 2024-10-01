import { FlatList } from "@/components/flat-list";
import { useChat } from "@/hooks/use-chat";
import { EmptyState } from "./EmptyState";
import { Header } from "./Header";
import { Keyboard } from "./Keyboard";

export function ChatContent() {
  const { selectedChat } = useChat();

  if (!selectedChat) {
    return <EmptyState />;
  }

  return (
    <FlatList
      data={selectedChat.messages}
      keyExtractor={(data) => data.id}
      renderItem={({ item }) => <p>{item.content}</p>}
      HeaderComponent={() => <Header />}
      FooterComponent={() => <Keyboard />}
      reverse
    />
  );
}
