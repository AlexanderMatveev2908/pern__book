import {
  REG_BOOK_TITLE,
  REG_ID,
  REG_INT,
  REG_NAME,
  REG_PRICE,
  REG_STORE_DESC,
} from "@/core/config/regex";
import { z } from "zod";

export const schemaBookForm = z.object({
  store: z
    .string({
      required_error: "Store is required",
      invalid_type_error: "Error developer 😠",
    })
    .nonempty("Store is required")
    .regex(REG_ID, "Error developer 😠"),
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

  qty: z
    .string()
    .min(1, "Quantity is required")
    .max(10, "max length exceeded")
    .regex(REG_INT, "Invalid quantity format")
    .refine((val) => +(val ?? "") >= 0, {
      message: "Quantity must be at least 0",
    }),
  price: z
    .string()
    .min(1, "Price is required")
    .max(10, "max length exceeded")
    .regex(REG_PRICE, "Invalid price format")
    .refine((val) => +(val ?? "") >= 0.01, {
      message: "Price must be at least $0.01",
    }),
});
