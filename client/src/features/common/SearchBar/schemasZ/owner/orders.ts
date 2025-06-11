import { z } from "zod";
import {
  itemsSchema,
  optInfoFromStore,
  superRefineQtyAndPrice,
} from "../general/general";
import { commonSchemaOrders } from "../general/orders";

const allowedKeys = ["ID", "bookStoreID", "bookStoreName"];

const optItem = {
  ...optInfoFromStore,
};

const itemSchema = itemsSchema({
  allowedKeys,
  optItem,
});

export const schemaOwnerOrders = commonSchemaOrders
  .extend({
    items: z.array(itemSchema).optional(),
  })
  .superRefine((data, ctx) => {
    superRefineQtyAndPrice({ data, ctx });
  });
