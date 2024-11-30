import { Button } from "@/components/ui/button";
import { useChat } from "@/hooks/use-chat";
import { MagnifyingGlassIcon, PlusIcon } from "@radix-ui/react-icons";
import { EmptyStateProps } from "./types";

export function EmptyState({ onCleanSearchInput }: EmptyStateProps) {
  const { showAddUserPage } = useChat();

  function onClickAddNewChat() {
    onCleanSearchInput?.();
    showAddUserPage();
  }

  return (
    <div className="flex items-center justify-center flex-1 px-2">
      <div className="flex flex-col items-center gap-2">
        <div className="size-14 rounded-full flex items-center justify-center bg-background">
          <MagnifyingGlassIcon />
        </div>
        <p className="text-sm font-semibold">Nenhuma conversa encontrada</p>
        <p className="text-xs font-normal">Adicione novas conversas</p>

        <Button size="sm" onClick={onClickAddNewChat} className="mt-3">
          <PlusIcon />
          Adicionar nova conversa
        </Button>
      </div>
    </div>
  );
}
