import { Messages } from "@/messages";
import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { NetworkContextValues } from "./types";

export const NetworkContext = createContext({} as NetworkContextValues);

export function NetworkProvider({ children }: PropsWithChildren) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  function checkConnection() {
    setIsOnline(navigator.onLine);
  }

  useEffect(() => {
    if (!isOnline) {
      toast(Messages.NETWORK_DISCONNECT_TITLE, {
        description: Messages.NETWORK_DISCONNECT_DESCRIPTION,
        closeButton: true,
        position: "top-right",
      });
    }
  }, [isOnline]);

  useEffect(() => {
    const events = ["online", "offline"];

    for (const event of events) {
      window.addEventListener(event, checkConnection);
    }

    return () => {
      for (const event of events) {
        window.removeEventListener(event, checkConnection);
      }
    };
  }, []);

  return (
    <NetworkContext.Provider value={{ isOnline }}>
      {children}
    </NetworkContext.Provider>
  );
}
