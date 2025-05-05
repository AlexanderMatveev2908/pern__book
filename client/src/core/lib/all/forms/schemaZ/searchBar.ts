import { REG_ID, REG_STORE_NAME } from "@/core/config/regex";
import { z } from "zod";
import { areaSchema } from "./user";

export const searchBarStore = z.object({
  name: z
    .string()
    .max(50, "Max length exceeded")
    .optional()
    .refine((val) => !val?.trim()?.length || REG_STORE_NAME.test(val), {
      message: "Invalid name format",
    }),

  ...areaSchema(true),

  ID: z
    .string()
    .max(36, "Invalid id length")
    .optional()
    .refine((val) => !val?.trim()?.length || REG_ID.test(val), {
      message: "Invalid id",
    }),
});
