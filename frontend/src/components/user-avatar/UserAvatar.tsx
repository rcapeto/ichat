import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { UserAvatarProps } from "./types";

export function UserAvatar({
  avatarFallback = "",
  fullName = "",
  avatarImage = "",
  className = "",
  title = "",
  onClick,
}: UserAvatarProps) {
  return (
    <Avatar
      className={cn("size-8 shadow-md", className)}
      title={title}
      onClick={onClick}
    >
      <AvatarImage src={avatarImage} alt={fullName} />
      <AvatarFallback className={cn("bg-background size-8", className)}>
        {avatarFallback}
      </AvatarFallback>
    </Avatar>
  );
}
