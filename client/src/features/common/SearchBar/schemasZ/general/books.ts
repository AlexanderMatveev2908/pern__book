/* eslint-disable @typescript-eslint/no-explicit-any */
import { categoriesBooks } from "@/types/all/books";
import { CatBookStore } from "@/types/all/bookStore";
import { z } from "zod";
import { generateZodSorters, schemaInt, schemaPrice } from "./general";
import { REG_BOOK_TITLE, REG_INT, REG_NAME } from "@/core/config/regex";
import { isValidNumber } from "@/core/lib/lib";

export const generalFieldsSearchBooksSchema = z.object({
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

  ...generateZodSorters([
    "createdAtSort",
    "updatedAtSort",
    "ratingSort",
    "priceSort",
  ]),
});

export const generalOptSearchBookItem = {
  title: {
    reg: REG_BOOK_TITLE,
    minLen: 0,
    maxLen: 50,
  },
  author: {
    reg: REG_NAME,
    minLen: 0,
    maxLen: 50,
  },
  year: {
    reg: REG_INT,
    // minLen: 4,
    maxLen: 4,
  },
};

export const handleYearRefine = ({ item, ctx }: any) => {
  const { field, val } = item;

  if (
    field === "year" &&
    isValidNumber(val) &&
    (+val! < 1450 || +val! > new Date().getFullYear())
  )
    ctx.addIssue({
      code: "custom",
      path: [`val`],
      message: `Year must be between 1450 and ${new Date().getFullYear()}`,
    });
};
