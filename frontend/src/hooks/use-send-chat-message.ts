import { Messages } from "@/messages";
import { handleCreateMessage } from "@/store/app/chat/requests";
import { useAlert } from "./use-alert";
import { useAppDispatch } from "./use-dispatch";

type BaseRequestParams = {
  successCallback?: () => void;
  errorCallback?: () => void;
};

type SendImageMessageParams = BaseRequestParams & {
  chatId: string;
  message: string;
  file: File;
};

type SendMessageParams = BaseRequestParams & {
  chatId: string;
  message: string;
};

export function useSendChatMessage() {
  const dispatch = useAppDispatch();

  const { showSonnerError } = useAlert();

  async function onSendImageMessage(params: SendImageMessageParams) {
    const { chatId, file, message, errorCallback, successCallback } = params;

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

      successCallback?.();
    } catch (err) {
      const errorMessage =
        (err as Error)?.message || Messages.DEFAULT_ERROR_MESSAGE;

      showSonnerError(errorMessage);
      errorCallback?.();
    }
  }

  async function onSendMessage({
    errorCallback,
    successCallback,
    chatId,
    message,
  }: SendMessageParams) {
    try {
      const formData = new FormData();

      formData.set("chatId", chatId);
      formData.set("content", message);

      const response = await dispatch(handleCreateMessage(formData));
      const isSuccess = !handleCreateMessage.rejected.match(response);

      if (!isSuccess) {
        throw new Error(
          response.error.message || Messages.DEFAULT_ERROR_MESSAGE
        );
      }

      successCallback?.();
    } catch (err) {
      const errorMessage =
        (err as Error)?.message || Messages.DEFAULT_ERROR_MESSAGE;

      showSonnerError(errorMessage);
      errorCallback?.();
    }
  }

  return { onSendImageMessage, onSendMessage };
}
