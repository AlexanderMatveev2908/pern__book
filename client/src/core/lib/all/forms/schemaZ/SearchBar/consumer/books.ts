import { z } from "zod";
import { handleRefineItem, itemsSchema } from "../general/general";
import {
  generalFieldsSearchBooksSchema,
  generalOptSearchBookItem,
  handleYearRefine,
  superRefinePrices,
} from "../general/books";

const allowedKeys = ["title", "author", "year"];

const optItem = {
  ...generalOptSearchBookItem,
};

const itemSchema = z
  .object(itemsSchema(allowedKeys))
  .superRefine((item, ctx) => {
    handleRefineItem({ item, optItem, ctx });
    handleYearRefine({ item, ctx });
  });

export const schemaConsumerBooks = generalFieldsSearchBooksSchema
  .omit({
    minQty: true,
    maxQty: true,
  })
  .extend({
    items: z.array(itemSchema).optional(),
  })
  .superRefine((data, ctx) => {
    superRefinePrices({ data, ctx });
  });
