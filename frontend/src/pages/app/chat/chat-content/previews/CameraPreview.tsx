import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAlert } from "@/hooks/use-alert";
import { useSendChatMessage } from "@/hooks/use-send-chat-message";
import { Messages } from "@/messages";
import { base64ToFile } from "@/utils/base64-to-file";
import {
  CameraIcon,
  Cross2Icon,
  PaperPlaneIcon,
  ReloadIcon,
} from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";

type CameraPreviewProps = {
  isVisible?: boolean;
  onClose?: () => void;
  chatId?: string;
};

export const imageType = "image/png";

const width = 375;
const height = 375;
const className = "dark:bg-zinc-800 rounded-md bg-zinc-200";

export function CameraPreview(props: CameraPreviewProps) {
  const { isVisible, onClose, chatId } = props;

  const { onSendImageMessage } = useSendChatMessage();
  const { showSonnerError } = useAlert();

  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState("");

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (isVisible) {
      startCamera();
    }

    return () => {
      stopCamera();
      onReset();
    };
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  async function onSendPicture() {
    if (preview && chatId) {
      const response = await base64ToFile({
        base64: preview,
      });

      if (response.ok) {
        await onSendImageMessage({
          chatId: chatId,
          file: response.file,
          message,
          successCallback: handleClosePreview,
        });
      } else {
        showSonnerError(Messages.DEFAULT_ERROR_MESSAGE);
      }
    }
  }

  function startCamera() {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      mediaStreamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    });
  }

  function stopCamera() {
    mediaStreamRef.current?.getTracks().forEach((track) => {
      track.stop();
    });

    mediaStreamRef.current = null;
  }

  function onTakePicture() {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      const video = videoRef.current;
      const context = canvas.getContext("2d");

      canvas.setAttribute("width", video.videoWidth.toString());
      canvas.setAttribute("height", video.videoHeight.toString());

      context?.translate(video.videoWidth, 0);
      context?.scale(-1, 1);

      context?.drawImage(video, 0, 0, canvas.width, canvas.height);

      setPreview(canvas.toDataURL(imageType));
      stopCamera();
    }
  }

  function onReset() {
    setPreview("");
    setMessage("");
  }

  function onStartNewPicture() {
    onReset();
    startCamera();
  }

  function handleClosePreview() {
    onReset();
    stopCamera();
    onClose?.();
  }

  return (
    <section className="flex flex-col gap-2">
      <header>
        <Button
          variant="ghost"
          title="Fechar câmera"
          onClick={handleClosePreview}
        >
          <Cross2Icon />
        </Button>
      </header>

      <main className="flex flex-col items-center gap-2">
        {preview ? (
          <img
            width={width}
            height={height}
            className={className}
            src={preview}
            alt="Preview da foto"
          />
        ) : (
          <video
            width={width}
            height={height}
            className={className}
            autoPlay
            ref={videoRef}
          />
        )}

        <div className="flex items-center gap-2">
          <Button size="icon" onClick={onTakePicture} disabled={!!preview}>
            <CameraIcon />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            onClick={onStartNewPicture}
            disabled={!preview}
          >
            <ReloadIcon />
          </Button>
        </div>
      </main>

      {preview && (
        <footer className="flex items-center gap-2 justify-between">
          <Textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="resize-none"
            placeholder="Perfeito! Agora só escrever um comentário fantástico...."
          />

          <Button size="icon" onClick={onSendPicture}>
            <PaperPlaneIcon />
          </Button>
        </footer>
      )}
    </section>
  );
}
