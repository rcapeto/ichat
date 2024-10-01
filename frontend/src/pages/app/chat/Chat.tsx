import { AppLayout } from "../components/Layout";
import { ChatContent } from "./ChatContent";
import { ChatSidebar } from "./Sidebar";

export function ChatPage() {
  return (
    <AppLayout className="flex-row p-0">
      <ChatSidebar />
      <ChatContent />
    </AppLayout>
  );
}
