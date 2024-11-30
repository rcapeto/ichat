import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/user-avatar";
import { useChat } from "@/hooks/use-chat";
import { FileIcon } from "@radix-ui/react-icons";
import { ChatRowProps } from "./types";
import { useUpdateTimer } from "./use-update-timer";

export function ChatRow(props: ChatRowProps) {
  const { chat } = props;

  const {
    selectChat,
    hideAddUserPage,
    changeShowChatCameraPreview,
    selectedChat,
  } = useChat();
  const lastMessage = chat.messages?.[0];
  const [firstName, lastName] = chat.name.split(" ");

  const avatarFallBack = `${firstName[0]}${lastName[0]}`;
  const isFile = Boolean(lastMessage?.fileUrl);

  const { timeDifference } = useUpdateTimer(lastMessage?.createdAt);

  function handleSelectChat() {
    if (selectedChat?.id === chat.id) {
      return;
    }

    selectChat({ chat });
    hideAddUserPage();
    changeShowChatCameraPreview(false);
  }

  return (
    <div
      onClick={handleSelectChat}
      title={lastMessage?.content}
      className="flex shadow-sm gap-2 items-center p-2 px-3 cursor-pointer transition-colors hover:bg-background"
    >
      <UserAvatar
        avatarFallback={avatarFallBack}
        fullName={chat.name}
        avatarImage={chat.avatar}
      />

      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-between">
          <p className="text-start text-xs font-semibold">{chat.name}</p>

          {lastMessage && <span className="text-[8px]">{timeDifference}</span>}
        </div>

        {lastMessage ? (
          <div className="flex items-center justify-between">
            <p className="text-xs">
              {isFile ? (
                <div className="flex items-center gap-1 text-xs">
                  Arquivo enviado <FileIcon />
                </div>
              ) : (
                `${firstName}: ${lastMessage.content}`
              )}
            </p>

            {chat.notification > 0 && (
              <Badge variant="outline">
                {chat.notification > 100 ? `99+` : chat.notification}
              </Badge>
            )}
          </div>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
