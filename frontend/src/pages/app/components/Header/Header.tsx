import { useAppSelector } from "@/hooks/use-selector";
import { joinWords } from "@/utils/join-words";
import { AccountDropdown } from "./Dropdown";
import { Logo } from "./Logo";

export function Header() {
  const { auth } = useAppSelector((state) => state.auth);
  const {
    firstName = "",
    lastName = "",
    profileImage = "",
    email = "",
  } = auth.payload?.session ?? {};

  const fullName = joinWords(firstName, lastName);
  const avatarFallback = `${firstName[0]}${lastName[0]}`;

  return (
    <header className="flex items-center justify-between px-10 py-2">
      <Logo />

      <AccountDropdown
        avatarFallback={avatarFallback}
        email={email}
        fullName={fullName}
        profileImage={profileImage ?? ""}
      />
    </header>
  );
}
