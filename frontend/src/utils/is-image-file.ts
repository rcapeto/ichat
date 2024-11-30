export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export function isImageFile(type: string) {
  return ACCEPTED_IMAGE_TYPES.includes(type);
}
