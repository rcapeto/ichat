export function getFormattedMessage(message: string, maxLength = 100) {
  if (message.length < maxLength) {
    return message;
  }

  const suffix = "...";

  return `${message.slice(0, maxLength)}${suffix}}`;
}
