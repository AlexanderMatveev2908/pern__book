import { REG_ID } from "@/core/config/regex";
import { itemsSchema, superRefineQtyAndPrice } from "../general/general";
import { z } from "zod";
import { commonSchemaOrders } from "../general/orders";

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

export const schemaOrdersConsumer = commonSchemaOrders
  .extend({
    items: z.array(itemSchema).optional(),
  })
  .superRefine((data, ctx) => {
    superRefineQtyAndPrice({ data, ctx });
  });

export type SearchOrdersConsumerType = z.infer<typeof schemaOrdersConsumer>;
