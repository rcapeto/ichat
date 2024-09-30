import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch } from "@/hooks/use-dispatch";
import { authActions } from "@/store/auth";
import {
  ChatBubbleIcon,
  LockClosedIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import { UserAvatar } from "./UserAvatar";
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

  const dispatch = useAppDispatch();

  const items = [
    { label: "Meu perfil", path: "", icon: PersonIcon },
    { label: "Alterar senha", path: "", icon: LockClosedIcon },
    { label: "Chat", path: "", icon: ChatBubbleIcon },
  ];

  function logout() {
    dispatch(authActions.logout());
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center gap-2">
          <UserAvatar
            avatarFallback={avatarFallback}
            fullName={fullName}
            profileImage={profileImage ?? ""}
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
              <item.icon />
              <Link to={item.path}>{item.label}</Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>Sair</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
