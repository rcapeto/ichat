import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/user-avatar";
import { useAccount } from "@/hooks/use-account";
import { useChat } from "@/hooks/use-chat";
import { ROUTES } from "@/routes";
import {
  ChatBubbleIcon,
  LockClosedIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import { UserInfo } from "./UserInfo";

type AccountDropdownProps = {
  email?: string;
  fullName?: string;
  avatarFallback?: string;
  profileImage?: string;
};

export function AccountDropdown(props: AccountDropdownProps) {
  const {
    avatarFallback = "",
    email = "",
    fullName = "",
    profileImage = "",
  } = props;

  const { logout } = useAccount();
  const { disconnectChat } = useChat();

  const items = [
    { label: "Meu perfil", path: ROUTES.MY_PROFILE, icon: PersonIcon },
    {
      label: "Alterar senha",
      path: ROUTES.CHANGE_PASSWORD,
      icon: LockClosedIcon,
    },
    { label: "Chat", path: ROUTES.HOME, icon: ChatBubbleIcon },
  ];

  function handleLogout() {
    logout();
    disconnectChat();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center gap-2">
          <UserAvatar
            avatarFallback={avatarFallback}
            fullName={fullName}
            avatarImage={profileImage ?? ""}
          />

          <UserInfo email={email} fullName={fullName} />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <UserInfo email={email} fullName={fullName} insideMenu />

        <DropdownMenuSeparator className="hidden max-sm:flex" />
        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {items.map((item, index) => (
            <DropdownMenuItem key={index.toString()} className="gap-2">
              <Link to={item.path} className="flex items-center gap-2 w-full">
                <item.icon />
                {item.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Sair</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
