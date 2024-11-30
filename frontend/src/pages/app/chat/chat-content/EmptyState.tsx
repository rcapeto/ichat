import { Button } from "@/components/ui/button";
import { useChat } from "@/hooks/use-chat";
import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons";

export function EmptyState() {
  const { showAddUserPage } = useChat();

  return (
    <div className="flex items-center justify-center flex-1">
      <div className="flex flex-col items-center gap-2">
        <div className="size-14 rounded-full flex items-center justify-center bg-background">
          <Cross2Icon />
        </div>
        <p className="text-sm font-semibold">Nenhuma conversa selecionada</p>
        <p className="text-xs font-normal">
          Selecione uma conversa para aparecer aqui
        </p>

        <Button size="sm" onClick={showAddUserPage} className="mt-3">
          <PlusIcon />
          Adicionar nova conversa
        </Button>
      </div>
    </div>
  );
}
