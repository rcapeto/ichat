import { ReactNode } from "react";

export type UserAvatarProps = {
  avatarImage?: string;
  fullName?: string;
  avatarFallback?: ReactNode;
  className?: string;
  onClick?: () => void;
  title?: string;
};
