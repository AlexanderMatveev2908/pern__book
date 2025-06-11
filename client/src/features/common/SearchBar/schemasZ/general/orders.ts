import { z } from "zod";
import { generateZodSorters, schemaInt, schemaPrice } from "./general";
import { CatBookStore } from "@/types/all/bookStore";
import { DeliveryType, StoreOrderStage } from "@/types/all/orders";

export const commonSchemaOrders = z.object({
  categories: z
    .array(z.enum(Object.values(CatBookStore) as [string, ...string[]]))
    .optional(),

  delivery: z
    .array(z.enum(Object.values(DeliveryType) as [string, ...string[]]))
    .optional(),

  minQty: schemaInt(),
  maxQty: schemaInt(),

  minPrice: schemaPrice(),
  maxPrice: schemaPrice(),

  stage: z
    .array(z.enum(Object.values(StoreOrderStage) as [string, ...string[]]))
    .optional(),

  ...generateZodSorters([
    "createdAtSort",
    "updatedAtSort",
    "priceSort",
    "qtySort",
  ]),
});
