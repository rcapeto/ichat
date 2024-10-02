import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { UserAvatar } from "@/components/user-avatar";
import { useChat } from "@/hooks/use-chat";
import { formatDate } from "@/utils/format-date";
import {
  CalendarIcon,
  InfoCircledIcon,
  PersonIcon,
} from "@radix-ui/react-icons";

export function Header() {
  const { selectedChat, onlineUsers } = useChat();

  if (!selectedChat) {
    return null;
  }

  const { avatar, name, chatUserId, createdAt } = selectedChat;
  const isOnline = onlineUsers.includes(chatUserId);

  return (
    <div className="border-b border-collapse flex items-center p-4">
      <div className="flex items-center gap-2 flex-1">
        <UserAvatar
          fullName={name}
          avatarImage={avatar}
          avatarFallback={<PersonIcon />}
          title={name}
        />

        <div className="flex flex-col">
          <span className="text-sm font-semibold">{name}</span>

          {isOnline && (
            <div className="flex items-center gap-1">
              <div className="size-2 rounded-full animate-pulse bg-green-500" />
              <span className="text-[10px] text-zinc-600 dark:text-zinc-300">
                Online
              </span>
            </div>
          )}
        </div>
      </div>

      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="ghost" size="icon">
            <InfoCircledIcon />
          </Button>
        </HoverCardTrigger>

        <HoverCardContent className="w-80">
          <div className="flex justify-between space-x-4">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">{name}</h4>
              <p className="text-sm">Criação do chat:</p>
              <div className="flex items-center pt-2">
                <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                <span className="text-xs text-muted-foreground">
                  {formatDate(createdAt)}
                </span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
