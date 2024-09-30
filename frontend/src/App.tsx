import { ComposeProviders } from "@/components/compose-providers";
import { Toaster } from "@/components/ui/sonner";
import { ModalProvider } from "@/contexts/modal";
import { NetworkProvider } from "@/contexts/network";
import { ThemeProvider } from "@/contexts/theme";
import { ApplicationRoutes } from "@/routes";
import store from "@/store";
import { Provider } from "react-redux";

const providers = [ModalProvider, NetworkProvider, ThemeProvider];

export function App() {
  return (
    <Provider store={store}>
      <ComposeProviders providers={providers}>
        <div className="bg-primary-foreground dark:bg-background w-screen h-screen">
          <ApplicationRoutes />
        </div>
        <Toaster />
      </ComposeProviders>
    </Provider>
  );
}
