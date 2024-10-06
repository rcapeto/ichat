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
import { useChat } from "@/hooks/use-chat";
import { useAppDispatch } from "@/hooks/use-dispatch";
import { useModal } from "@/hooks/use-modal";
import { Messages } from "@/messages";
import { handleCreateMessage } from "@/store/app/chat/requests";
import { isImageFile } from "@/utils/is-image-file";
import {
  CameraIcon,
  FileIcon,
  PaperPlaneIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { ChangeEvent, useRef, useState } from "react";
import { CameraPreview, PhotoPreview } from "./previews";

export function Keyboard() {
  const [message, setMessage] = useState("");
  const { showSonnerError } = useAlert();

  const { showModal, closeModal } = useModal();
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const { selectedChat } = useChat();

  const dispatch = useAppDispatch();

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
          chatId: selectedChat?.id,
        },
        title: "Imagem selecionada",
      });
    }
  }

  function attachFile() {
    inputFileRef.current?.click();
  }

  function openDialogCamera() {
    showModal({
      Component: CameraPreview,
      title: "Tire sua foto!",
      passProps: {
        onClose: closeModal,
        onTakePicture,
      },
    });
  }

  function onTakePicture(image: string) {
    //transformar em file através do fetch
    console.log("@image", image);
  }

  const actions = [
    {
      onClick: attachFile,
      Icon: FileIcon,
      label: "Anexar arquivo",
    },
    {
      onClick: openDialogCamera,
      Icon: CameraIcon,
      label: "Tirar foto",
    },
  ];

  async function onClickSendMessage() {
    if (!message || !selectedChat) {
      return;
    }

    try {
      const formData = new FormData();

      formData.set("chatId", selectedChat.id);
      formData.set("content", message);

      const response = await dispatch(handleCreateMessage(formData));
      const isSuccess = !handleCreateMessage.rejected.match(response);

      if (!isSuccess) {
        throw new Error(
          response.error.message || Messages.DEFAULT_ERROR_MESSAGE
        );
      }

      setMessage("");
    } catch (err) {
      const errorMessage =
        (err as Error)?.message || Messages.DEFAULT_ERROR_MESSAGE;

      showSonnerError(errorMessage);
    }
  }

  return (
    <div className="flex items-center p-4 gap-2 justify-between border-collapse border-t">
      <Textarea
        value={message}
        onChange={(event) => setMessage(event.target.value)}
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
