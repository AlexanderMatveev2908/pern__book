import {
  REG_BOOK_TITLE,
  REG_ID,
  REG_INT,
  REG_NAME,
  REG_PRICE,
  REG_STORE_NAME,
} from "@/core/config/regex";
import { notStr } from "@/core/lib/lib";
import { z } from "zod";

export const schemaSearchBooks = z.object({
  ID: z
    .string()
    .optional()
    .refine((val) => notStr(val) || REG_ID.test(val ?? ""), {
      message: "Invalid id",
    }),
  bookStoreID: z
    .string()
    .optional()
    .refine((val) => notStr(val) || REG_ID.test(val ?? ""), {
      message: "Invalid id",
    }),
  bookStoreName: z
    .string()
    .optional()
    .refine((val) => notStr(val) || REG_STORE_NAME.test(val ?? ""), {
      message: "Invalid name format",
    }),
  title: z
    .string()
    .max(50, "Invalid length")
    .optional()
    .refine((val) => notStr(val) || REG_BOOK_TITLE.test(val ?? ""), {
      message: "Invalid title",
    }),
  author: z
    .string()
    .max(50, "Invalid length")
    .optional()
    .refine((val) => notStr(val) || REG_NAME.test(val ?? ""), {
      message: "Invalid author",
    }),
  year: z
    .string()
    .optional()
    .refine((val) => notStr(val) || REG_INT.test(val ?? ""), {
      message: "Invalid year",
    })
    .refine(
      (val) => {
        if (notStr(val)) return true;

        const num = +(val ?? "");

        return num < 1450 || num > new Date().getFullYear();
      },
      {
        message: `Year must be between 1450 and ${new Date().getFullYear()}`,
      }
    ),

  qty: z
    .string()
    .optional()
    .refine((val) => notStr(val) || REG_INT.test(val ?? ""), {
      message: "Invalid quantity",
    }),
  price: z
    .string()
    .optional()
    .refine((val) => notStr(val) || REG_PRICE.test(val ?? ""), {
      message: "Invalid price",
    }),

  categories: z.array(z.string()).optional(),
});
