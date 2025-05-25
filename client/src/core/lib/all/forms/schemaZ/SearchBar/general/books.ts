/* eslint-disable @typescript-eslint/no-explicit-any */
import { categoriesBooks } from "@/types/all/books";
import { CatBookStore } from "@/types/all/bookStore";
import { z } from "zod";
import { schemaInt, schemaPrice } from "./general";
import {
  REG_BOOK_TITLE,
  REG_INT,
  REG_NAME,
  REG_STORE_NAME,
} from "@/core/config/regex";
import { isValidNumber } from "@/core/lib/lib";

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
});

export const generalOptSearchBookItem = {
  bookStoreName: {
    reg: REG_STORE_NAME,
    minLen: 0,
    maxLen: 50,
  },
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

export const commonHandleRefineBooks = ({ data, ctx }: any) => {
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

  if ([data?.minPrice, data?.maxPrice].every(isValidNumber)) {
    const min = +data.minPrice!;
    const max = +data.maxPrice!;
    if (min > max)
      ctx.addIssue({
        code: "custom",
        path: ["minPrice"],
        message: msgsErrsBookSearchForm.price.min,
      });
    if (max < min)
      ctx.addIssue({
        code: "custom",
        path: ["maxPrice"],
        message: msgsErrsBookSearchForm.price.max,
      });
  }
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
