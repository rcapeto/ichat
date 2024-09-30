import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export const baseScrollClass =
  "overflow-auto scrollbar-thin scrollbar-thumb-zinc-300 scrollbar-track-zinc-200 dark:scrollbar-thumb-zinc-800 dark:scrollbar-track-zinc-900";

export function Scroll(props: PropsWithChildren<{ className: string }>) {
  return (
    <div className={cn(baseScrollClass, props.className)}>{props.children}</div>
  );
}
