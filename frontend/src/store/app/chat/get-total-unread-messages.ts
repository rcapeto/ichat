import { SimpleChat } from "@/services/http/requests/app/chat/types";

export function getTotalUnreadMessages(chats: SimpleChat[]): number {
  return chats.reduce((acc, chat) => {
    return acc + (chat?.notification ?? 0);
  }, 0);
}
