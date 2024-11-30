import { ChangePasswordPage } from "@/pages/app/chage-password";
import { ChatPage } from "@/pages/app/chat";
import { ProfilePage } from "@/pages/app/profile";
import { AuthPage } from "@/pages/auth";
import { AppRoute } from "./types";

export const ROUTES = {
  AUTH: "/authorization",
  HOME: "/",
  MY_PROFILE: "/profile",
  CHANGE_PASSWORD: "/change-password",
};

export const authRoutes: AppRoute[] = [
  {
    Component: AuthPage,
    isPrivate: false,
    path: ROUTES.AUTH,
  },
];

export const appRoutes: AppRoute[] = [
  {
    Component: ChatPage,
    path: ROUTES.HOME,
    isPrivate: true,
  },
  {
    Component: ProfilePage,
    path: ROUTES.MY_PROFILE,
    isPrivate: true,
  },
  {
    Component: ChangePasswordPage,
    path: ROUTES.CHANGE_PASSWORD,
    isPrivate: true,
  },
];
