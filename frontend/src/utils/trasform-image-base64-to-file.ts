export const imageType = "image/jpeg";

export async function transformImageBase64ToFile(image: string) {
  const response = await fetch(image);
  const buffer = await response.arrayBuffer();

  const file = new File([buffer], `captured-photo-${Date.now()}`, {
    type: imageType,
  });

  return file;
}
