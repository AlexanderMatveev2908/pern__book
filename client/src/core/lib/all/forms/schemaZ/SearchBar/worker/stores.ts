import { z } from "zod";
import {
  baseOptItemSchemaStore,
  generalFiltersStoreSchema,
  handleRefineItem,
  itemsSchema,
} from "../general";

const allowedKeys = ["name", "country", "state", "city"];

const itemSchema = z
  .object(itemsSchema(allowedKeys))
  .superRefine((item, ctx) => {
    handleRefineItem({ item, optItem: { ...baseOptItemSchemaStore }, ctx });
  });

export const schemaWorkerStores = generalFiltersStoreSchema.extend({
  items: z.array(itemSchema).optional(),
});
