import { contactUser, fakeUser } from "@/store/auth";
import { joinWords } from "@/utils/join-words";
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
  UpdateReadMessages,
} from "./types";

// insertNewMessage
// setSelectedChat
// updateReadMessages

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
    payload: null,
  },
  requestReadMessage: {
    error: false,
    loading: false,
    payload: null,
  },
  chats: [
    {
      avatar: "",
      id: "chat-id-1",
      messages: [
        {
          chatId: "chat-id-1",
          content: "olá raphael",
          createdAt: new Date().toISOString(),
          fileUrl: "",
          owner: contactUser.session,
          id: "message-1-id",
          ownerId: contactUser.session.id,
          read: true,
        },
        {
          chatId: "chat-id-1",
          content: "olá john",
          createdAt: new Date().toISOString(),
          fileUrl: "",
          owner: fakeUser.session,
          id: "message-2-id",
          ownerId: fakeUser.session.id,
          read: true,
        },
        {
          chatId: "chat-id-1",
          content: "como vc está?",
          createdAt: new Date().toISOString(),
          fileUrl: "",
          owner: contactUser.session,
          id: "message-3-id",
          ownerId: contactUser.session.id,
          read: false,
        },
      ],
      name: joinWords(
        contactUser.session.firstName,
        contactUser.session.lastName
      ),
      notification: 2,
      updatedAt: new Date().toISOString(),
      chatUserId: contactUser.session.id,
      createdAt: new Date().toISOString()
    },
  ],
  totalUnreadMessages: 0,
  selectedChat: null,
};

const ChatSlice = createSlice({
  initialState,
  name: "chat-store",
  reducers: {
    insertNewChat(state, action: PayloadAction<InsertNewChat>) {
      const chats = [...state.chats];

      chats.push(action.payload.chat);

      state.chats = orderChats(chats);
      state.totalUnreadMessages = getTotalUnreadMessages(chats);
    },
    insertNewMessage(state, action: PayloadAction<InsertNewMessage>) {
      const { chatId, messages, isOldMessage } = action.payload;
      const chats = [...state.chats];
      const chat = chats.find((chat) => chat.id === chatId);

      if (chat) {
        if (isOldMessage) {
          chat.messages.push(...messages);
        } else {
          chat.messages.unshift(...messages);
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

      if (chat) {
        chat.messages.map((message) => ({
          ...message,
          read: message.ownerId !== userReadMessagesId ? true : message.read,
        }));
      }

      state.chats = orderChats(chats);
      state.totalUnreadMessages = getTotalUnreadMessages(chats);
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
