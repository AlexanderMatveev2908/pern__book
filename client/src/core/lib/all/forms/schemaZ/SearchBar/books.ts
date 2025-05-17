import {
  REG_BOOK_TITLE,
  REG_INT,
  REG_NAME,
  REG_STORE_NAME,
} from "@/core/config/regex";
import { isStr } from "@/core/lib/lib";
import { z } from "zod";
import { schemaID, schemaPrice, schemaInt } from "./general";
import { CatBookStore } from "@/types/all/bookStore";
import { categoriesBooks } from "@/types/all/books";

export const schemaSearchBooks = z.object({
  ID: schemaID(),
  bookStoreID: schemaID(),
  bookStoreName: z
    .string()
    .optional()
    .refine((val) => !isStr(val) || REG_STORE_NAME.test(val ?? ""), {
      message: "Invalid name format",
    }),
  title: z
    .string()
    .max(50, "Invalid length")
    .optional()
    .refine((val) => !isStr(val) || REG_BOOK_TITLE.test(val ?? ""), {
      message: "Invalid title",
    }),
  author: z
    .string()
    .max(50, "Invalid length")
    .optional()
    .refine((val) => !isStr(val) || REG_NAME.test(val ?? ""), {
      message: "Invalid author",
    }),
  year: z
    .string()
    .optional()
    .refine((val) => !isStr(val) || REG_INT.test(val ?? ""), {
      message: "Invalid year",
    })
    .refine(
      (val) => {
        if (!isStr(val)) return true;

        const num = +(val ?? "");

        return num < 1450 || num > new Date().getFullYear();
      },
      {
        message: `Year must be between 1450 and ${new Date().getFullYear()}`,
      }
    ),

  mainCategories: z.array(
    z.enum(Object.values(CatBookStore) as [string, ...string[]]).optional()
  ),
  subCategories: z
    .array(z.enum(categoriesBooks as [string, ...string[]]))
    .optional(),

  minQty: schemaInt(),
  maxQty: schemaInt(),

  minPrice: schemaPrice(),
  maxPrice: schemaPrice(),
});
