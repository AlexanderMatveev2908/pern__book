import { z } from "zod";
import { itemsSchema, superRefinePrices } from "../general/general";
import {
  generalFieldsSearchBooksSchema,
  generalOptSearchBookItem,
  handleYearRefine,
} from "../general/books";
import { DeliveryType } from "@/types/all/orders";

const allowedKeys = ["title", "author", "year"];

const optItem = {
  ...generalOptSearchBookItem,
};

const itemSchema = itemsSchema({
  allowedKeys,
  optItem,
  customValidateCB: handleYearRefine,
});

export const schemaConsumerBooks = generalFieldsSearchBooksSchema
  .omit({
    minQty: true,
    maxQty: true,
  })
  .extend({
    items: z.array(itemSchema).optional(),

    delivery: z
      .array(z.enum(Object.values(DeliveryType) as [string, ...string[]]))
      .optional(),
  })
  .superRefine((data, ctx) => {
    superRefinePrices({ data, ctx });
  });
