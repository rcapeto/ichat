import { ComposeProviders } from "@/components/compose-providers";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { ModalProvider } from "@/contexts/modal";
import { NetworkProvider } from "@/contexts/network";
import { Routes } from "@/routes";
import { useEffect } from "react";
import { useAccount } from "./hooks/use-account";

const providers = [ModalProvider, NetworkProvider];

export function App() {
  const { getMySession } = useAccount();

  useEffect(() => {
    getMySession();
  }, []);

  return (
    <ComposeProviders providers={providers}>
      <div className="bg-primary-foreground dark:bg-background w-screen h-screen">
        <Routes />
      </div>
      <Toaster />
      <Sonner />
    </ComposeProviders>
  );
}
