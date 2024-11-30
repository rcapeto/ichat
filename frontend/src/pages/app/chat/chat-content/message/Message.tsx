import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserAvatar } from "@/components/user-avatar";
import { useAccount } from "@/hooks/use-account";
import { useChat } from "@/hooks/use-chat";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/format-date";
import { EyeClosedIcon, EyeOpenIcon, PersonIcon } from "@radix-ui/react-icons";
import { MessageProps } from "./types";

export function Message(props: MessageProps) {
  const { session } = useAccount();
  const { selectedChat } = useChat();

  const { message } = props;
  const { ownerId } = message;

  const isMyMessage = ownerId === session?.id;
  const ReadIcon = message.read ? EyeOpenIcon : EyeClosedIcon;

  function openImage() {
    if (message.fileUrl) {
      window.open(message.fileUrl, "__blank");
    }
  }

  return (
    <div
      className={cn(
        "flex items-center",
        isMyMessage ? "justify-end" : "justify-start"
      )}
    >
      <div className="flex items-end gap-2">
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
            "flex flex-col gap-1 min-w-[150px] max-w-[300px] p-2 rounded-xl relative pb-3",
            !isMyMessage ? "bg-zinc-200 dark:bg-zinc-800" : "bg-primary"
          )}
        >
          {/* imagem */}
          {message.fileUrl && (
            <img
              src={message.fileUrl}
              alt={message.content}
              className="size-52 w-full object-cover cursor-pointer rounded-sm"
              onClick={openImage}
            />
          )}

          <div className="flex items-center gap-2 flex-wrap">
            <p
              className={cn(
                "text-xs",
                isMyMessage ? "text-primary-foreground" : "text-primary"
              )}
            >
              {message.content}
            </p>

            <div className="flex items-center justify-end gap-1 flex-1">
              <p className="text-[10px] text-zinc-400">
                {formatDate(message.createdAt, "HH:mm")}
              </p>
            </div>
          </div>

          {isMyMessage && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={cn(
                      "size-5 rounded-full flex items-center justify-center absolute -right-2 -bottom-2",
                      !isMyMessage ? "bg-zinc-200" : "bg-primary",
                      !isMyMessage ? "dark:bg-zinc-800" : ""
                    )}
                  >
                    <ReadIcon
                      className={
                        isMyMessage ? "text-primary-foreground" : "text-primary"
                      }
                    />
                  </div>
                </TooltipTrigger>

                <TooltipContent>
                  {message.read ? "Lido" : "Não lido"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          {!isMyMessage && (
            <div className="size-3 rotate-[300deg] absolute bottom-1.5 -left-0.5 shape bg-zinc-200 dark:bg-zinc-800" />
          )}
        </div>
      </div>
    </div>
  );
}
