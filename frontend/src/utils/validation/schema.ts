import { Messages } from "@/messages";
import { validatePassword } from "@/utils/validatePassword";
import { createValidationError } from "@/utils/validation/create-error-validation";
import { z } from "zod";

export function getStringSchema(field: string) {
  const error = createValidationError(field);

  return z.string(error.required).trim().min(1, error.empty);
}

export function getIdSchema(field: string) {
  return getStringSchema(field).uuid(Messages.MUST_BE_AN_UUID(field));
}

export function getEmailSchema(field: string) {
  return getStringSchema(field).email(Messages.MUST_BE_AN_EMAIL(field));
}

export function getStringWithLengthSchema(field: string, length: number) {
  return getStringSchema(field).min(
    length,
    Messages.REQUIRED_MIN_LENGTH(field, length)
  );
}

export function getBoolSchema(field: string) {
  const error = createValidationError(field);

  return z.boolean(error.required);
}

export function getPasswordSchema(field = "Password") {
  return getStringSchema(field).refine(
    (data) => !validatePassword(data).hasError,
    {
      message: Messages.PASSWORD_BASIC_REQUIREMENTS(field),
    }
  );
}

export function getNumberSchema(field: string) {
  const error = createValidationError(field);

  return z.number(error.required);
}

export function getOptionalStringSchema() {
  return z.string().nullish().default("");
}

export function getOptionalNumberSchema(defaultNumber: number) {
  return z.coerce.number().nullish().default(defaultNumber);
}

export function getOptionalBoolSchema() {
  return z.boolean().nullish().default(false);
}
