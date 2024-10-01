import {
  ChatStoreState,
  InsertNewChat,
  InsertNewMessage,
  SelectChat,
  UpdateReadMessages,
} from "@/store/app/chat/types";

export type ChatContextValues = ChatStoreState & {
  addNewChat: (params: InsertNewChat) => void;
  addNewMessage: (params: InsertNewMessage) => void;
  selectChat: (params: SelectChat) => void;
  updateUnreadMessages: (params: UpdateReadMessages) => void;
  disconnectChat: () => void;
  userId: string;
  showUsersModal: () => void;
};
