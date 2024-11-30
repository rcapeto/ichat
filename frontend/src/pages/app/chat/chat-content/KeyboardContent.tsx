import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAlert } from "@/hooks/use-alert";
import { useModal } from "@/hooks/use-modal";
import { useSendChatMessage } from "@/hooks/use-send-chat-message";
import { Messages } from "@/messages";
import { isImageFile } from "@/utils/is-image-file";
import {
  CameraIcon,
  FileIcon,
  PaperPlaneIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { ChangeEvent, useRef } from "react";
import { PhotoPreview } from "./previews";

type KeyboardContentProps = {
  message: string;
  onChangeMessageText: (newContent: string) => void;
  onOpenCameraPreview?: () => void;
  chatId?: string;
};

export function KeyboardContent({
  message,
  onChangeMessageText,
  onOpenCameraPreview,
  chatId,
}: KeyboardContentProps) {
  const { showModal, closeModal } = useModal();
  const { showSonnerError } = useAlert();
  const { onSendMessage } = useSendChatMessage();

  const inputFileRef = useRef<HTMLInputElement | null>(null);

  function attachFile() {
    inputFileRef.current?.click();
  }

  const actions = [
    {
      onClick: attachFile,
      Icon: FileIcon,
      label: "Anexar arquivo",
    },
    {
      onClick: onOpenCameraPreview,
      Icon: CameraIcon,
      label: "Tirar foto",
    },
  ];

  async function onClickSendMessage() {
    if (!message || !chatId) {
      return;
    }

    await onSendMessage({
      chatId: chatId,
      message,
      successCallback: () => onChangeMessageText(""),
    });
  }

  function handleChooseFile(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;

    if (files && files[0]) {
      const file = files[0];
      const isImage = isImageFile(file.type);

      if (!isImage) {
        showSonnerError(Messages.INVALID_FILE_TYPE, Messages.INVALID_FORMAT);
      }

      showModal({
        Component: PhotoPreview,
        passProps: {
          file,
          onClose: closeModal,
          chatId: chatId,
        },
        title: "Imagem selecionada",
      });
    }
  }

  return (
    <div className="flex items-center gap-2 justify-between">
      <Textarea
        value={message}
        onChange={(event) => onChangeMessageText(event.target.value)}
        className="resize-none"
      />

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button size="icon">
              <PlusIcon />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuGroup>
              {actions.map(({ Icon, label, onClick }, index) => (
                <DropdownMenuItem
                  key={index.toString()}
                  className="gap-2 flex items-center"
                  onClick={onClick}
                >
                  <Icon />
                  <p>{label}</p>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button size="icon" onClick={onClickSendMessage}>
          <PaperPlaneIcon />
        </Button>
      </div>

      <Input
        type="file"
        hidden
        ref={inputFileRef}
        className="hidden"
        onChange={handleChooseFile}
        accept="image/*"
      />
    </div>
  );
}
