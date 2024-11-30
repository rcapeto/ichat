import { useChat } from "@/hooks/use-chat";
import { useState } from "react";
import { KeyboardContent } from "./KeyboardContent";
import { CameraPreview } from "./previews";

export function Keyboard() {
  const [message, setMessage] = useState("");
  const { showChatCameraPreview, changeShowChatCameraPreview } = useChat();

  const { selectedChat } = useChat();

  function openDialogCamera() {
    changeShowChatCameraPreview(true);
  }
  function handleCloseCameraPreview() {
    changeShowChatCameraPreview(false);
  }

  return (
    <div className="flex flex-col p-4 gap-2 border-collapse border-t animate-in">
      <CameraPreview
        isVisible={showChatCameraPreview}
        onClose={handleCloseCameraPreview}
        chatId={selectedChat?.id}
      />

      {!showChatCameraPreview && (
        <KeyboardContent
          message={message}
          onChangeMessageText={setMessage}
          chatId={selectedChat?.id}
          onOpenCameraPreview={openDialogCamera}
        />
      )}
    </div>
  );
}
