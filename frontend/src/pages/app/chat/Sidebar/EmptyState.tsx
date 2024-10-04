import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export function EmptyState() {
  return (
    <div className="flex items-center justify-center flex-1 px-2">
      <div className="flex flex-col items-center gap-2">
        <div className="size-14 rounded-full flex items-center justify-center bg-background">
          <MagnifyingGlassIcon />
        </div>
        <p className="text-sm font-semibold">Nenhuma conversa encontrada</p>
        <p className="text-xs font-normal">Adicione novas conversas</p>
      </div>
    </div>
  );
}
