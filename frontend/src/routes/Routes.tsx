import { BrowserRouter } from "react-router-dom";
import { ApplicationRoutes } from "./ApplicationRoutes";
import { AuthRoutes } from "./AuthRoutes";

export function Routes() {
  return (
    <BrowserRouter>
      <AuthRoutes />
      <ApplicationRoutes />
    </BrowserRouter>
  );
}
