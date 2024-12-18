import store from "@/store";
import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-br";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { App } from "./App.tsx";
import "./index.css";

dayjs.locale(ptBR);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
