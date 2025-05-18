import {
  REG_BOOK_TITLE,
  REG_INT,
  REG_NAME,
  REG_STORE_NAME,
} from "@/core/config/regex";
import { isStr, isValidNumber } from "@/core/lib/lib";
import { z } from "zod";
import { schemaID, schemaPrice, schemaInt } from "./general";
import { CatBookStore } from "@/types/all/bookStore";
import { categoriesBooks } from "@/types/all/books";

export const msgsErrsBookSearchForm = {
  price: {
    min: "Min price is bigger than max price",
    max: "Max price is lower than min price",
  },
  qty: {
    min: "Min qty must be lower than max qty",
    max: "Max qty must be bigger than min qty",
  },
};

export const schemaSearchBooks = z
  .object({
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

    mainCategories: z
      .array(z.enum(Object.values(CatBookStore) as [string, ...string[]]))
      .optional(),
    subCategories: z
      .array(z.enum(categoriesBooks as [string, ...string[]]))
      .optional(),

    minQty: schemaInt(),
    maxQty: schemaInt(),

    minPrice: schemaPrice(),
    maxPrice: schemaPrice(),
  })
  .superRefine((data, ctx) => {
    if (isValidNumber(data?.minQty) && isValidNumber(data?.maxQty)) {
      const min = +data.minQty!;
      const max = +data.maxQty!;
      if (min > max)
        ctx.addIssue({
          code: "custom",
          path: ["minQty"],
          message: msgsErrsBookSearchForm.qty.min,
        });
      if (max < min)
        ctx.addIssue({
          code: "custom",
          path: ["maxQty"],
          message: msgsErrsBookSearchForm.qty.max,
        });
    }
  });
