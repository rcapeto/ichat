import {
  ChatStoreState,
  InsertNewChat,
  InsertNewMessage,
  SelectChat,
  UpdateReadMessages,
} from "@/store/app/chat/types";

export type ChatContextValues = ChatStoreState & {
  addNewChat: (params: InsertNewChat) => void;
  addNewMessages: (params: InsertNewMessage) => void;
  selectChat: (params: SelectChat) => void;
  updateUnreadMessages: (params: UpdateReadMessages) => void;
  disconnectChat: () => void;
  userId: string;
  showAddUserPage: () => void;
  hideAddUserPage: () => void;
  isVisibleAddUserPage: boolean;
  changeShowChatCameraPreview: (newValue: boolean) => void;
};
