import { z } from "zod";
import { generateZodSorters, schemaInt, schemaPrice } from "./general";
import { CatBookStore } from "@/types/all/bookStore";
import { DeliveryType } from "@/types/all/orders";

export const commonSchemaOrders = z.object({
  mainCategories: z
    .array(z.enum(Object.values(CatBookStore) as [string, ...string[]]))
    .optional(),

  delivery: z
    .array(z.enum(Object.values(DeliveryType) as [string, ...string[]]))
    .optional(),

  minQty: schemaInt(),
  maxQty: schemaInt(),

  minPrice: schemaPrice(),
  maxPrice: schemaPrice(),

  ...generateZodSorters([
    "createdAtSort",
    "updatedAtSort",
    "priceSort",
    "qtySort",
  ]),
});
