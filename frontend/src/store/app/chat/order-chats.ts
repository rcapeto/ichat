import { SimpleChat } from "@/services/http/requests/app/chat/types";
import dayjs from "dayjs";

export function orderChats(chats: SimpleChat[]) {
  return chats.sort((a, b) => {
    const lastMessageA = a.messages?.[0]?.createdAt;
    const lastMessageB = b.messages?.[0]?.createdAt;

    const chatALastUpdated = a.updatedAt;
    const chatBLastUpdated = b.updatedAt;

    const chatADate = lastMessageA ?? chatALastUpdated;
    const chatBDate = lastMessageB ?? chatBLastUpdated;

    return (
      dayjs(chatBDate).toDate().getTime() - dayjs(chatADate).toDate().getTime()
    );
  });
}
