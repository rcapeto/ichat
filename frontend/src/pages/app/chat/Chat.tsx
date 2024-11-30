import { useAccount } from "@/hooks/use-account";
import { useAppDispatch } from "@/hooks/use-dispatch";
import { chatActions } from "@/store/app/chat";
import { useEffect } from "react";
import { AppLayout } from "../components/Layout";
import { ChatContent } from "./chat-content";
import { ChatSidebar } from "./sidebar";

export function ChatPage() {
  const dispatch = useAppDispatch();
  const { session } = useAccount();

  function updateUserId(id: string) {
    dispatch(chatActions.setLoggedUserId({ id }));
  }

  useEffect(() => {
    if (session?.id) {
      updateUserId(session.id);
    }
  }, [session?.id]);

  return (
    <AppLayout className="flex-row p-0">
      <ChatSidebar />
      <ChatContent />
    </AppLayout>
  );
}
