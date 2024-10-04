import { PhotoPreviewProps } from "./types";

export function PhotoPreview(props: PhotoPreviewProps) {
  const { file } = props;

  return (
    <div>
      <p>File</p>

      <p>{file.name}</p>
    </div>
  );
}
