import {
  REG_BOOK_TITLE,
  REG_INT,
  REG_NAME,
  REG_STORE_DESC,
} from "@/core/config/regex";
import { z } from "zod";

export const schemaBookForm = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(50, "Max length exceeded")
    .regex(REG_BOOK_TITLE, "Invalid title chars"),

  author: z
    .string()
    .min(1, "Author is required")
    .max(50, "Max length exceeded")
    .regex(REG_NAME, "Invalid author chars"),

  year: z
    .string()
    .length(4, "Invalid year format")
    .regex(REG_INT, "Invalid year format"),

  description: z
    .string()
    .max(12000, "Max length description exceeded")
    .optional()
    .refine((val) => !val?.trim().length || val.length > 10, {
      message: "If provided description must be at least 10 chars",
    })
    .refine((val) => !val?.trim().length || REG_STORE_DESC.test(val), {
      message: "Invalid text chars",
    }),

  images: z
    .union([z.array(z.string()), z.array(z.instanceof(File))])
    .optional()
    .refine(
      (val) => {
        const userUpload =
          Array.isArray(val) &&
          !!val?.length &&
          val?.every((img: File | string) => img instanceof File);

        if (userUpload)
          return val.every((img: File) => img?.type?.startsWith("image"));

        return true;
      },
      {
        message: "Use the input above for video",
      }
    )
    .refine((val) => !val?.length || val.length <= 5, {
      message: "For practical reason max length images is 5",
    }),
});
