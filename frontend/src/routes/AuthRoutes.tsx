import { ProtectedRoute } from "@/components/protected-route/ProtectedRoute";
import { Route, Routes } from "react-router-dom";
import { authRoutes } from "./config";

export function AuthRoutes() {
  return (
    <Routes>
      {authRoutes.map((route) => (
        <Route
          path={route.path}
          key={route.path}
          element={<ProtectedRoute appRoute={route} />}
        />
      ))}
    </Routes>
  );
}
