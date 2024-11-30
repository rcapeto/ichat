import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { UserAvatar } from "@/components/user-avatar";
import { useAlert } from "@/hooks/use-alert";
import { useChat } from "@/hooks/use-chat";
import { useAppDispatch } from "@/hooks/use-dispatch";
import { useSendChatMessage } from "@/hooks/use-send-chat-message";
import { Messages } from "@/messages";
import { handleCreateChat } from "@/store/app/chat/requests";
import { joinWords } from "@/utils/join-words";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { UserRowProps } from "./types";

export function UserRow(props: UserRowProps) {
  const { user } = props;
  const dispatch = useAppDispatch();
  const { hideAddUserPage } = useChat();
  const { showToastError } = useAlert();
  const { onSendMessage } = useSendChatMessage();

  const [message, setMessage] = useState("");
  const [active, setActive] = useState(false);

  const fullName = joinWords(user.firstName, user.lastName);
  const avatarFallback = `${user.firstName[0]}${user.lastName[0]}`;

  function handleClick() {
    setActive((prevState) => !prevState);
  }

  async function createNewChat() {
    try {
      const response = await dispatch(handleCreateChat({ contactId: user.id }));
      const isSuccess = !handleCreateChat.rejected.match(response);

      if (!isSuccess) {
        throw new Error(response.error.message);
      }

      return response.payload.chat;
    } catch (err) {
      const errorMessage =
        (err as Error)?.message || Messages.DEFAULT_ERROR_MESSAGE;

      showToastError(errorMessage);

      return null;
    }
  }

  async function createNewMessage() {
    const chat = await createNewChat();

    if (!chat) {
      return;
    }

    await onSendMessage({
      chatId: chat.id,
      message,
      successCallback: hideAddUserPage,
    });
  }

  async function onClickSendMessage() {
    await createNewMessage();
  }

  return (
    <div className="flex flex-col gap-2">
      <div
        className="bg-background p-4 rounded-md border border-collapse flex items-center gap-2 cursor-pointer"
        onClick={handleClick}
      >
        <UserAvatar
          avatarImage={user.profileImage ?? ""}
          fullName={fullName}
          avatarFallback={avatarFallback}
        />
        <p>{fullName}</p>
      </div>

      {active && (
        <div className="flex items-center gap-2">
          <Textarea
            className="resize-none"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />

          <Button
            size="icon"
            aria-label="Enviar mensagem"
            onClick={onClickSendMessage}
          >
            <PaperPlaneIcon />
          </Button>
        </div>
      )}
    </div>
  );
}
