import { UserAvatar } from "@/components/user-avatar";
import { useChat } from "@/hooks/use-chat";
import { PersonIcon } from "@radix-ui/react-icons";

export function Header() {
  const { selectedChat } = useChat();

  if (!selectedChat) {
    return null;
  }

  const { avatar, name } = selectedChat;

  return (
    <div className="border-b border-collapse">
      <div>
        <UserAvatar
          fullName={name}
          avatarImage={avatar}
          avatarFallback={<PersonIcon />}
          title={name}
        />

        <div></div>
      </div>

      <div></div>
      {selectedChat.name}
    </div>
  );
}
