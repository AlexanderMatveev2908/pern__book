import { REG_ID } from "@/core/config/regex";
import { commonSchemaOrders } from "../general/orders";
import { itemsSchema, superRefineQtyAndPrice } from "../general/general";
import { z } from "zod";

const allowedKeys = ["ID"];

const optItem = {
  ID: {
    reg: REG_ID,
    minLen: 0,
    maxLen: 36,
  },
};

const itemSchema = itemsSchema({
  allowedKeys,
  optItem,
});

export const schemaOrdersWorker = commonSchemaOrders
  .extend({
    items: z.array(itemSchema).optional(),
  })
  .superRefine((data, ctx) => {
    superRefineQtyAndPrice({ data, ctx });
  });
