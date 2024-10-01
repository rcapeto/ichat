import { FlatList } from "@/components/flat-list";
import { Button } from "@/components/ui/button";
import { InputSearch } from "@/components/ui/input";
import { useChat } from "@/hooks/use-chat";
import { ChatRow } from "@/pages/app/chat/components/ChatRow";
import { PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { ChatRowLoading } from "../components/ChatRow/ChatRowLoading";

export function ChatSidebar() {
  const [search, setSearch] = useState("");
  const { chats, requestChats, showUsersModal } = useChat();

  const filteredChats = chats.filter((chat) => {
    const chatNameLowercase = chat.name.toLowerCase();
    const searchLowercase = search.toLowerCase();

    return chatNameLowercase.includes(searchLowercase);
  });

  const isLoading = requestChats.loading;

  return (
    <FlatList
      data={filteredChats}
      keyExtractor={(item) => item.id}
      renderItem={({ item: chat }) => <ChatRow chat={chat} key={chat.id} />}
      containerClassName="max-w-[250px] border-r border-collapse"
      isLoading={isLoading}
      LoadingComponent={() => <ChatRowLoading />}
      loadingQuantityItems={5}
      HeaderComponent={() => (
        <div className="flex flex-col gap-2 p-2">
          <div className="flex items-center justify-between">
            <h4 className="text-md font-semibold">Conversas</h4>

            <Button size="icon" variant="ghost" onClick={showUsersModal}>
              <PlusIcon />
            </Button>
          </div>

          <InputSearch
            value={search}
            placeholder="Procure sua conversa..."
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      )}
    />
  );
}
