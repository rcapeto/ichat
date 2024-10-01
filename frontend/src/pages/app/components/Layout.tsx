import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";
import { Header } from "./Header";

type LayoutProps = {
  className?: string;
};

export function AppLayout(props: PropsWithChildren<LayoutProps>) {
  return (
    <div className="w-screen h-screen bg-background flex items-center justify-center">
      <div className="flex-1 w-full h-full shadow-2xl max-w-5xl max-h-[700px] rounded-lg flex flex-col  bg-gray-100 dark:bg-zinc-900 max-sm:max-w-full max-sm:max-h-full">
        <Header />

        <div
          className={cn(
            "flex-1 flex flex-col overflow-hidden p-6",
            props.className
          )}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
}
