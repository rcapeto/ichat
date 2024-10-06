import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAlert } from "@/hooks/use-alert";
import { useAppDispatch } from "@/hooks/use-dispatch";
import { Messages } from "@/messages";
import { handleCreateMessage } from "@/store/app/chat/requests";
import { useState } from "react";
import { PhotoPreviewProps } from "./types";

export function PhotoPreview(props: PhotoPreviewProps) {
  const { file, onClose, chatId } = props;
  const [message, setMessage] = useState("");
  const dispatch = useAppDispatch();
  const { showSonnerError } = useAlert();

  const fileURL = URL.createObjectURL(file);

  async function onSendImage() {
    if (!chatId) {
      return;
    }

    try {
      const formData = new FormData();

      formData.set("chatId", chatId);
      formData.set("content", message);
      formData.set("messageAsset", file);

      const response = await dispatch(handleCreateMessage(formData));
      const isSuccess = !handleCreateMessage.rejected.match(response);

      if (!isSuccess) {
        throw new Error(
          response.error.message || Messages.DEFAULT_ERROR_MESSAGE
        );
      }

      onClose?.();
    } catch (err) {
      const errorMessage =
        (err as Error)?.message || Messages.DEFAULT_ERROR_MESSAGE;

      showSonnerError(errorMessage);
    }
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
        <Button onClick={onSendImage}>Enviar</Button>
      </div>
    </div>
  );
}
