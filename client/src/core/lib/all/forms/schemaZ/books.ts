import { REG_BOOK_TITLE } from "@/core/config/regex";
import { z } from "zod";

export const schemaBookForm = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(50, "Max length exceeded")
    .regex(REG_BOOK_TITLE, "Invalid title chars"),
});
