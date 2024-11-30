import { cn } from "@/lib/utils";
import { ScrollProps } from "./types";

export const baseScrollClass =
  "flex flex-col overflow-auto scrollbar-thin scrollbar-thumb-zinc-300 scrollbar-track-zinc-200 dark:scrollbar-thumb-zinc-800 dark:scrollbar-track-zinc-900";

export function Scroll(props: ScrollProps) {
  const { children, onScroll, className } = props;

  return (
    <div className={cn(baseScrollClass, className)} onScroll={onScroll}>
      {children}
    </div>
  );
}
