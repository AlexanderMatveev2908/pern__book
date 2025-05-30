import { REG_ID, REG_STORE_NAME } from "@/core/config/regex";
import { z } from "zod";
import { itemsSchema, handleRefineItem } from "../general/general.ts";
import {
  commonHandleRefineBooks,
  generalFieldsSearchBooksSchema,
  generalOptSearchBookItem,
  handleYearRefine,
} from "../general/books.ts";

const allowedKeys = [
  "ID",
  "bookStoreID",
  "bookStoreName",
  "title",
  "author",
  "year",
];

const optItem = {
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
  ...generalOptSearchBookItem,
};

const itemSchema = z
  .object(itemsSchema(allowedKeys))
  .superRefine((item, ctx) => {
    handleRefineItem({ item, optItem, ctx });
    handleYearRefine({ item, ctx });
  });

export const schemaSearchBooks = generalFieldsSearchBooksSchema
  .extend({
    items: z.array(itemSchema).optional(),
  })
  .superRefine((data, ctx) => {
    commonHandleRefineBooks({ data, ctx });
  });
