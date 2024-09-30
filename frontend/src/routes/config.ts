import { ChatPage } from "@/pages/app/chat";
import { AuthPage } from "@/pages/auth";
import { AppRoute } from "./types";

export const ROUTES = {
  AUTH: "/authorization",
  HOME: "/",
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
];
