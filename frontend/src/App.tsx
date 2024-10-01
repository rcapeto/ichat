import { ComposeProviders } from "@/components/compose-providers";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { ModalProvider } from "@/contexts/modal";
import { NetworkProvider } from "@/contexts/network";
import { Routes } from "@/routes";
import store from "@/store";
import { Provider } from "react-redux";

const providers = [ModalProvider, NetworkProvider];

export function App() {
  return (
    <Provider store={store}>
      <ComposeProviders providers={providers}>
        <div className="bg-primary-foreground dark:bg-background w-screen h-screen">
          <Routes />
        </div>
        <Toaster />
        <Sonner />
      </ComposeProviders>
    </Provider>
  );
}
