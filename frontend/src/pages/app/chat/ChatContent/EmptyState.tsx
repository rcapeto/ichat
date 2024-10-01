import { Button } from "@/components/ui/button";
import { useChat } from "@/hooks/use-chat";
import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons";

export function EmptyState() {
  const { showUsersModal } = useChat();

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

        <Button className="mt-2 gap-2" onClick={showUsersModal}>
          <PlusIcon />
          Criar nova conversa
        </Button>
      </div>
    </div>
  );
}
