import { Messages } from "@/messages";

export function createValidationError(field: string, message?: string) {
  return {
    required: createRequiredMessage(field, message),
    empty: createEmptyError(field, message),
    uuid: Messages.MUST_BE_AN_UUID(field),
  };
}

function createEmptyError(field: string, message?: string) {
  const formattedField = upperCaseFirstLetter(field);

  return message ?? Messages.EMPTY_FIELD(formattedField);
}

function createRequiredMessage(field: string, message?: string) {
  const formattedField = upperCaseFirstLetter(field);
  const required_error = message ?? Messages.REQUIRED_FIELD(formattedField);

  return { required_error };
}

function upperCaseFirstLetter(word: string) {
  const firstLetter = word?.[0] ?? "";
  return word.replace(firstLetter, firstLetter.toUpperCase());
}
