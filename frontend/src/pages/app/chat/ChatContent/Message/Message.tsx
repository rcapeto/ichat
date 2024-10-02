import { UserAvatar } from "@/components/user-avatar";
import { useAccount } from "@/hooks/use-account";
import { useChat } from "@/hooks/use-chat";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/format-date";
import { CheckIcon, PersonIcon } from "@radix-ui/react-icons";
import { MessageProps } from "./types";

export function Message(props: MessageProps) {
  const { session } = useAccount();
  const { selectedChat } = useChat();

  const { message } = props;
  const { ownerId } = message;

  const isMyMessage = ownerId === session?.id;

  return (
    <div
      className={cn(
        "flex items-center",
        isMyMessage ? "justify-end" : "justify-start"
      )}
    >
      <div className="flex items-end gap-1">
        {!isMyMessage && (
          <UserAvatar
            fullName={selectedChat?.name}
            avatarImage={selectedChat?.name}
            avatarFallback={<PersonIcon />}
            title={selectedChat?.name}
          />
        )}

        <div
          className={cn(
            "flex flex-col gap-1 min-w-[150px] max-w-[300px] bg-red-100"
          )}
        >
          {/* imagem */}

          <div className="flex items-center gap-2 flex-wrap">
            <p>{message.content}</p>

            <div className="flex items-center gap-1 justify-end flex-1">
              <span className="text-[10px] text-zinc-300">
                {formatDate(message.createdAt, "HH:mm")}
              </span>

              <CheckIcon
                className={cn(
                  "text-[10px]",
                  message.read ? "text-purple-600" : "text-zinc-500"
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
