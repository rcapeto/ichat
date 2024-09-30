import { Header } from "@/pages/app/components/Header";
import { PropsWithChildren } from "react";

export function AppLayout(props: PropsWithChildren) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="bg-gray-100 dark:bg-zinc-900 w-full h-full max-w-screen-lg max-h-[700px] rounded-lg shadow-2xl flex flex-col gap-3 max-sm:max-w-full max-sm:max-h-full">
        <Header />

        <div className="px-6 flex flex-col flex-1">{props.children}</div>
      </div>
    </div>
  );
}
