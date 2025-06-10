import { z } from "zod";
import {
  superRefineQtyAndPrice,
  itemsSchema,
  optInfoFromStore,
} from "../general/general.ts";
import {
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

    qtySort: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    superRefineQtyAndPrice({ data, ctx });
  });
