import { Header } from "@/pages/app/components/Header";
import { PropsWithChildren } from "react";

export function AppLayout(props: PropsWithChildren) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="bg-zinc-200 dark:bg-zinc-900 w-full h-full max-w-screen-lg max-h-[700px] rounded-md flex flex-col max-sm:max-w-full max-sm:max-h-full">
        <Header />
        {props.children}
      </div>
    </div>
  );
}
