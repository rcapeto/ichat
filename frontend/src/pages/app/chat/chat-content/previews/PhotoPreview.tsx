import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useSendChatMessage } from "@/hooks/use-send-chat-message";
import { useState } from "react";
import { PhotoPreviewProps } from "./types";

export function PhotoPreview(props: PhotoPreviewProps) {
  const { file, onClose, chatId } = props;
  const [message, setMessage] = useState("");
  const { onSendImageMessage } = useSendChatMessage();

  const fileURL = URL.createObjectURL(file);

  async function handleSend() {
    await onSendImageMessage({
      chatId,
      file,
      message,
      successCallback: onClose,
    });
  }

  return (
    <div className="flex-1 flex flex-col py-2 gap-2 px-2">
      <div className="flex items-center justify-center">
        <img className="object-cover h-48 w-96 ..." src={fileURL} />
      </div>

      <Textarea
        value={message}
        className="resize-none"
        placeholder="Adicione uma mensagem..."
        onChange={(event) => setMessage(event.target.value)}
      />

      <div className="flex gap-2 items-center justify-end">
        <Button onClick={onClose} variant="secondary">
          Cancelar
        </Button>
        <Button onClick={handleSend}>Enviar</Button>
      </div>
    </div>
  );
}
