import { Messages } from "@/messages";
import {
  getEmailSchema,
  getPasswordSchema,
  getStringSchema,
  getStringWithLengthSchema,
} from "@/utils/validation/schema";
import { z } from "zod";

export const loginValidation = z.object({
  email: getEmailSchema("email"),
  password: getStringWithLengthSchema("senha", 8),
});

export const registerValidation = z
  .object({
    email: getEmailSchema("email"),
    password: getPasswordSchema("senha"),
    confirmPassword: getStringSchema("confirmação de senha"),
    firstName: getStringSchema("nome"),
    lastName: getStringSchema("sobrenome"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: Messages.PASSWORD_MISS_MATCH,
    path: ["confirmPassword"], // path of error
  });

export type LoginFormValues = z.infer<typeof loginValidation>;
export type RegisterFormValues = z.infer<typeof registerValidation>;
