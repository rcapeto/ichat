import Cookie from "js-cookie";
import { Navigate, useLocation } from "react-router-dom";
import { ProtectedRouteProps } from "./types";

import { Loading } from "@/components/loading";
import { applicationConfig } from "@/config/application";
import { useAppSelector } from "@/hooks/use-selector";
import { ROUTES, authRoutes } from "@/routes";

function isAuth(route: string) {
  return authRoutes.map((item) => item.path).includes(route);
}

export function ProtectedRoute({ appRoute }: ProtectedRouteProps) {
  const { auth } = useAppSelector((state) => state.auth);
  const { pathname } = useLocation();

  const isLoading = auth.loading;
  const isError = auth.error;

  const isLogged = Boolean(auth.payload?.session);
  const isAuthenticated =
    isLogged || Cookie.get(applicationConfig.cookies.userToken);
  const authRoute = isAuth(pathname);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <p>Página de erro</p>;
  }

  if (appRoute.isPrivate && !isAuthenticated) {
    return <Navigate to={ROUTES.AUTH} />;
  }

  if (authRoute && isAuthenticated) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return <appRoute.Component />;
}