import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTotalUnreadMessages } from "./get-total-unread-messages";
import { orderChats } from "./order-chats";
import {
  handleCreateChat,
  handleCreateMessage,
  handleGetMessagesChat,
  handleGetMyChats,
  handleGetUsersChat,
  handleReadChatMessages,
} from "./requests";
import {
  ChatStoreState,
  InsertNewChat,
  InsertNewMessage,
  SelectChat,
  SetLoggedUserId,
  UpdateOnlineUsers,
  UpdateReadMessages,
} from "./types";

const initialState: ChatStoreState = {
  requestChatMessages: {
    error: false,
    loading: false,
    payload: null,
  },
  requestChats: {
    error: false,
    loading: false,
    payload: null,
  },
  requestCreateMessage: {
    error: false,
    loading: false,
    payload: null,
  },
  requestCreateChat: {
    error: false,
    loading: false,
    payload: null,
  },
  requestUsers: {
    error: false,
    loading: false,
    payload: {
      count: 2,
      page: 1,
      totalPages: 1,
      users: [],
    },
  },
  requestReadMessage: {
    error: false,
    loading: false,
    payload: null,
  },
  chats: [],
  totalUnreadMessages: 0,
  selectedChat: null,
  onlineUsers: [],
  loggedUserId: "",
};

const ChatSlice = createSlice({
  initialState,
  name: "chat-store",
  reducers: {
    insertNewChat(state, action: PayloadAction<InsertNewChat>) {
      const chats = [...state.chats];

      chats.push(action.payload.chat);

      state.selectedChat = action.payload.chat;
      state.chats = orderChats(chats);
      state.totalUnreadMessages = getTotalUnreadMessages(chats);
    },
    insertNewMessage(state, action: PayloadAction<InsertNewMessage>) {
      const { chatId, messages, isOldMessage } = action.payload;
      const chats = [...state.chats];
      const chat = chats.find((chat) => chat.id === chatId);

      if (chat) {
        for (const message of messages) {
          const isMyMessage = message.ownerId === state.loggedUserId;
          const isRead = message.read;

          if (!isMyMessage && !isRead) {
            chat.notification += 1;
          }
        }

        if (isOldMessage) {
          chat.messages.push(...messages);
        } else {
          chat.messages.unshift(...messages);
        }

        if (state.selectedChat?.id === chat.id) {
          state.selectedChat = chat;
        }
      }

      state.chats = orderChats(chats);
      state.totalUnreadMessages = getTotalUnreadMessages(chats);
    },
    selectChat(state, action: PayloadAction<SelectChat>) {
      const { chat, chatId } = action.payload;

      if (chat) {
        state.selectedChat = chat;
      }

      const stateChat = state.chats.find((item) => item.id === chatId);

      if (stateChat) {
        state.selectedChat = stateChat;
      }
    },
    updateReadMessages(state, action: PayloadAction<UpdateReadMessages>) {
      const { chatId, userReadMessagesId } = action.payload;
      const chats = [...state.chats];
      const chat = chats.find((chat) => chat.id === chatId);
      const isMeTheReader =
        action.payload.userReadMessagesId === state.loggedUserId;

      if (chat) {
        chat.messages = chat.messages.map((message) => {
          const requestedIsOwner = message.ownerId === userReadMessagesId;

          return {
            ...message,
            read: requestedIsOwner ? message.read : true,
          };
        });

        if (isMeTheReader) {
          chat.notification = 0;
        }

        if (state.selectedChat && state.selectedChat.id === chatId) {
          state.selectedChat = chat;
        }
      }

      state.chats = orderChats(chats);
      state.totalUnreadMessages = getTotalUnreadMessages(chats);
    },
    updateOnlineUsers(state, action: PayloadAction<UpdateOnlineUsers>) {
      state.onlineUsers = action.payload.onlineUsers;
    },
    setLoggedUserId(state, action: PayloadAction<SetLoggedUserId>) {
      state.loggedUserId = action.payload.id;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(handleCreateChat.pending, (state) => {
        state.requestCreateChat.loading = true;
        state.requestCreateChat.error = false;
      })
      .addCase(handleCreateChat.fulfilled, (state, action) => {
        state.requestCreateChat.loading = false;
        state.requestCreateChat.payload = action.payload;
      })
      .addCase(handleCreateChat.rejected, (state) => {
        state.requestCreateChat.loading = false;
        state.requestCreateChat.error = true;
      })

      .addCase(handleCreateMessage.pending, (state) => {
        state.requestCreateMessage.loading = true;
        state.requestCreateMessage.error = false;
      })
      .addCase(handleCreateMessage.fulfilled, (state, action) => {
        state.requestCreateMessage.loading = false;
        state.requestCreateMessage.payload = action.payload;
      })
      .addCase(handleCreateMessage.rejected, (state) => {
        state.requestCreateMessage.loading = false;
        state.requestCreateMessage.error = true;
      })

      .addCase(handleGetMessagesChat.pending, (state) => {
        state.requestChatMessages.loading = true;
        state.requestChatMessages.error = false;
      })
      .addCase(handleGetMessagesChat.fulfilled, (state, action) => {
        state.requestChatMessages.loading = false;
        state.requestChatMessages.payload = action.payload;
      })
      .addCase(handleGetMessagesChat.rejected, (state) => {
        state.requestChatMessages.loading = false;
        state.requestChatMessages.error = true;
      })

      .addCase(handleGetMyChats.pending, (state) => {
        state.requestChats.loading = true;
        state.requestChats.error = false;
      })
      .addCase(handleGetMyChats.fulfilled, (state, action) => {
        state.requestChats.loading = false;
        state.requestChats.payload = action.payload;

        state.chats = orderChats(action.payload.chats);
      })
      .addCase(handleGetMyChats.rejected, (state) => {
        state.requestChats.loading = false;
        state.requestChats.error = true;
      })

      .addCase(handleGetUsersChat.pending, (state) => {
        state.requestUsers.loading = true;
        state.requestUsers.error = false;
      })
      .addCase(handleGetUsersChat.fulfilled, (state, action) => {
        state.requestUsers.loading = false;
        state.requestUsers.payload = action.payload;
      })
      .addCase(handleGetUsersChat.rejected, (state) => {
        state.requestUsers.loading = false;
        state.requestUsers.error = true;
      })

      .addCase(handleReadChatMessages.pending, (state) => {
        state.requestReadMessage.loading = true;
        state.requestReadMessage.error = false;
      })
      .addCase(handleReadChatMessages.fulfilled, (state, action) => {
        state.requestReadMessage.loading = false;
        state.requestReadMessage.payload = action.payload;
      })
      .addCase(handleReadChatMessages.rejected, (state) => {
        state.requestReadMessage.loading = false;
        state.requestReadMessage.error = true;
      });
  },
});

export default ChatSlice.reducer;
export const chatActions = ChatSlice.actions;

//emery.homenick@yahoo.com
// @Contato12345
