import { z } from "zod";
import {
  itemsSchema,
  handleRefineItem,
  optInfoFromStore,
} from "../general/general.ts";
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
