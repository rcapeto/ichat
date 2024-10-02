import { useAccount } from "@/hooks/use-account";
import { joinWords } from "@/utils/join-words";
import { AccountDropdown } from "./Dropdown";
import { Logo } from "./Logo";
import { ThemeSwitch } from "./ThemeSwitch";

export function Header() {
  const { session } = useAccount();
  const {
    firstName = "",
    lastName = "",
    profileImage = "",
    email = "",
  } = session ?? {};

  const fullName = joinWords(firstName, lastName);
  const avatarFallback = `${firstName[0]}${lastName[0]}`;

  return (
    <header className="flex items-center justify-between px-8 py-2 pb-4 border-b border-collapse">
      <Logo />

      <div className="flex items-center gap-7">
        <ThemeSwitch />

        <AccountDropdown
          avatarFallback={avatarFallback}
          email={email}
          fullName={fullName}
          profileImage={profileImage ?? ""}
        />
      </div>
    </header>
  );
}
