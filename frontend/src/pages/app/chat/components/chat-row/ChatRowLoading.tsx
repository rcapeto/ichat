import { Skeleton } from "@/components/ui/skeleton";

export function ChatRowLoading() {
  return (
    <div className="flex shadow-sm gap-1 items-center p-2 cursor-pointer transition-colors hover:bg-background">
      <Skeleton className="size-8 rounded-full" />

      <div className="flex flex-col flex-1 gap-2">
        <Skeleton className="w-full max-w-[80%] h-2" />
        <Skeleton className="max-w-[50%] h-2" />
      </div>
    </div>
  );
}
