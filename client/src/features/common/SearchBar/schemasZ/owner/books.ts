import { z } from "zod";
import { itemsSchema, optInfoFromStore } from "../general/general.ts";
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
  ...optInfoFromStore,
  ...generalOptSearchBookItem,
};

const itemSchema = itemsSchema({
  allowedKeys,
  optItem,
  customValidateCB: handleYearRefine,
});

export const schemaSearchBooks = generalFieldsSearchBooksSchema
  .extend({
    items: z.array(itemSchema).optional(),
  })
  .superRefine((data, ctx) => {
    commonHandleRefineBooks({ data, ctx });
  });
