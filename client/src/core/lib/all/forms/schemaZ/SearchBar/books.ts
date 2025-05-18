import {
  REG_BOOK_TITLE,
  REG_ID,
  REG_INT,
  REG_NAME,
  REG_STORE_NAME,
} from "@/core/config/regex";
import { isValidNumber } from "@/core/lib/lib";
import { z } from "zod";
import {
  schemaPrice,
  schemaInt,
  itemsSchema,
  handleRefineItem,
} from "./general";
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

const allowedKeys = [
  "ID",
  "bookStoreID",
  "bookStoreName",
  "title",
  "author",
  "year",
];

const optItem = {
  ID: {
    reg: REG_ID,
    minLen: 0,
    maxLen: 36,
  },
  bookStoreID: {
    reg: REG_ID,
    minLen: 0,
    maxLen: 36,
  },
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

const itemSchema = z
  .object(itemsSchema(allowedKeys))
  .superRefine((item, ctx) => {
    const { field, val } = item;

    handleRefineItem({ item, optItem, ctx });

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
  });

export const schemaSearchBooks = z
  .object({
    items: z.array(itemSchema).optional(),

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
  });
