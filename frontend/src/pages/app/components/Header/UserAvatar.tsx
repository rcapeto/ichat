import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type UserAvatarProps = {
  profileImage?: string;
  fullName?: string;
  avatarFallback?: string;
};

export function UserAvatar({
  avatarFallback = "",
  fullName = "",
  profileImage = "",
}: UserAvatarProps) {
  return (
    <Avatar className="size-8">
      <AvatarImage src={profileImage} alt={fullName} />
      <AvatarFallback className="bg-violet-600 text-white size-8">
        {avatarFallback}
      </AvatarFallback>
    </Avatar>
  );
}
