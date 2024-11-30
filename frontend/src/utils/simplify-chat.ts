import { Chat } from "@/services/http/requests/app/chat/types"
import { joinWords } from "./join-words"

type SimplifyConfig ={
   chat: Chat,
   loggedUserId: string,
}

export function simplifyChat({ chat, loggedUserId }: SimplifyConfig) {
   const isMe = chat.ownerId === loggedUserId
    const chatInfo = isMe ? chat.contact : chat.owner

    return {
      avatar: chatInfo.profileImage ?? '',
      id: chat.id,
      messages: chat.messages,
      name: joinWords(chatInfo.firstName, chatInfo.lastName),
      chatUserId: chatInfo.id,
      notification: isMe
        ? chat.ownerUnreadCount
        : chat.contactUnreadCount,
      updatedAt: chat.updatedAt,
      createdAt: chat.updatedAt
    }
}