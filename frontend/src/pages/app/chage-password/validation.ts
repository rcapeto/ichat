import { getPasswordSchema, getStringSchema } from "@/utils/validation/schema";
import { z } from "zod";

export const validation = z.object({
  password: getStringSchema("senha"),
  newPassword: getPasswordSchema("nova senha"),
});

export type ChangePasswordValues = z.infer<typeof validation>;
