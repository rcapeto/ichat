import { ProtectedRoute } from "@/components/protected-route/ProtectedRoute";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { appRoutes, authRoutes } from "./config";
import { AppRoute } from "./types";

export function ApplicationRoutes() {
  const routes: AppRoute[] = [...authRoutes, ...appRoutes];

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route
            path={route.path}
            key={route.path}
            element={<ProtectedRoute appRoute={route} />}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
