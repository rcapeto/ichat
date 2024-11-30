type Base64ToFileConfig = {
  base64: string;
  filename?: string;
  fileType?: string;
};

type SuccessResponse = {
  ok: true;
  file: File;
};

type RejectResponse = {
  ok: false;
  errorMessage: string;
  specificError: string;
};

type Base64ToFileResponse = SuccessResponse | RejectResponse;

export async function base64ToFile({
  base64,
  fileType = "image/png",
  filename = `file-${Date.now()}`,
}: Base64ToFileConfig): Promise<Base64ToFileResponse> {
  try {
    const response = await fetch(base64);
    const blob = await response.blob();
    const file = new File([blob], filename, { type: fileType });

    return { file, ok: true };
  } catch (err) {
    return {
      errorMessage: `Error transform base64 to file`,
      specificError: (err as Error).message ?? "",
      ok: false,
    };
  }
}
