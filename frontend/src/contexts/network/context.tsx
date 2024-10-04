import { useAlert } from "@/hooks/use-alert";
import { Messages } from "@/messages";
import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { NetworkContextValues } from "./types";

export const NetworkContext = createContext({} as NetworkContextValues);

export function NetworkProvider({ children }: PropsWithChildren) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { showToastError } = useAlert();

  function checkConnection() {
    setIsOnline(navigator.onLine);
  }

  useEffect(() => {
    if (!isOnline) {
      showToastError(
        Messages.NETWORK_DISCONNECT_TITLE,
        Messages.NETWORK_DISCONNECT_DESCRIPTION
      );
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
