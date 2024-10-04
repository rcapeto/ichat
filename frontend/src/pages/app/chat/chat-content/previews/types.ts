export type PhotoPreviewProps = {
  file: File;
  onClose?: () => void;
};

export type CameraPreviewProps = {
  onClose?: () => void;
  onTakePicture?: (image: string) => void;
};
