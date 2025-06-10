import { z } from "zod";
import { itemsSchema, optInfoFromStore } from "../general/general";

const allowedKeys = ["ID", "bookStoreID", "bookStoreName"];

const optItem = {
  ...optInfoFromStore,
};

const itemSchema = z.object(itemsSchema(allowedKeys));

export const schemaOwnerOrders = z.object({});
