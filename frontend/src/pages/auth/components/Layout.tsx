import { PropsWithChildren } from "react";

export function AuthLayout(props: PropsWithChildren) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="bg-background border border-zinc-600 rounded-xl w-full h-full max-w-[500px] max-h-[500px] flex-1 overflow-hidden max-sm:max-w-full max-sm:rounded-none max-sm:border-none">
        {props.children}
      </div>
    </div>
  );
}
