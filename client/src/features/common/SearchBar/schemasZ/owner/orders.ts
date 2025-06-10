import { z } from "zod";
import { itemsSchema, optInfoFromStore } from "../general/general";

const allowedKeys = ["ID", "bookStoreID", "bookStoreName"];

const optItem = {
  ...optInfoFromStore,
};

const itemSchema = itemsSchema({
  allowedKeys,
  optItem,
});

export const schemaOwnerOrders = z.object({
  items: z.array(itemSchema).optional(),
});
