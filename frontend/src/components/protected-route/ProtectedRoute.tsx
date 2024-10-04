import Cookie from "js-cookie";
import { Navigate, useLocation } from "react-router-dom";
import { ProtectedRouteProps } from "./types";

import { Loading } from "@/components/loading";
import { applicationConfig } from "@/config/application";
import { useAccount } from "@/hooks/use-account";
import { ROUTES, authRoutes } from "@/routes";

function isAuth(route: string) {
  return authRoutes.map((item) => item.path).includes(route);
}

export function ProtectedRoute({ appRoute }: ProtectedRouteProps) {
  const { isLoading, session } = useAccount();
  const { pathname } = useLocation();

  const isLogged = Boolean(session);
  const isAuthenticated =
    isLogged || Cookie.get(applicationConfig.cookies.userToken);
  const authRoute = isAuth(pathname);

  if (isLoading) {
    return <Loading />;
  }

  if (appRoute.isPrivate && !isAuthenticated) {
    return <Navigate to={ROUTES.AUTH} />;
  }

  if (authRoute && isAuthenticated) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return <appRoute.Component />;
}
