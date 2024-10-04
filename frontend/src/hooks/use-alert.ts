import { Messages } from "@/messages";
import { ExternalToast, toast as sonner } from "sonner";
import { ToastConfig, useToast } from "./use-toast";

export function useAlert() {
  const { toast } = useToast();

  function showSonnerError(description: string, title = Messages.ERROR_TITLE) {
    sonner.error(title, {
      description,
    });
  }

  function showSonner(title: string, config?: ExternalToast) {
    sonner(title, config);
  }

  function showToastError(description: string, title = Messages.ERROR_TITLE) {
    toast({
      title,
      description,
      variant: "destructive",
    });
  }

  function showToast(title: string, config?: Omit<ToastConfig, "title">) {
    toast({
      title,
      ...config,
    });
  }

  return {
    showSonnerError,
    showSonner,
    showToastError,
    showToast,
  };
}
