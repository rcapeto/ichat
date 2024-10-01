import { ChatContext } from "@/contexts/chat";
import { useContext } from "react";

export function useChat() {
  return useContext(ChatContext);
}
