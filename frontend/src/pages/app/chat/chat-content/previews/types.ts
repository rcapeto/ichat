export type PhotoPreviewProps = {
  file: File;
  onClose?: () => void;
  chatId: string;
};

export type CameraPreviewProps = {
  onClose?: () => void;
  onTakePicture?: (image: string) => void;
};
