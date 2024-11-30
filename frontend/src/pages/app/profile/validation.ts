import {
  getEmailSchema,
  getOptionalStringSchema,
  getStringSchema,
} from "@/utils/validation/schema";
import { z } from "zod";

export const validation = z.object({
  email: getEmailSchema("email"),
  firstName: getStringSchema("nome"),
  lastName: getStringSchema("sobrenome"),
  imageFile: z.instanceof(File).nullable(),
  imagePreview: getOptionalStringSchema(),
});

export type ProfileValues = z.infer<typeof validation>;
