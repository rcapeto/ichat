import { ProtectedRoute } from "@/components/protected-route/ProtectedRoute";
import { ChatProvider } from "@/contexts/chat";
import { Route, Routes } from "react-router-dom";
import { appRoutes } from "./config";

export function ApplicationRoutes() {
  return (
    <Routes>
      {appRoutes.map((route) => (
        <Route
          path={route.path}
          key={route.path}
          element={
            <ChatProvider>
              <ProtectedRoute appRoute={route} />
            </ChatProvider>
          }
        />
      ))}
    </Routes>
  );
}
