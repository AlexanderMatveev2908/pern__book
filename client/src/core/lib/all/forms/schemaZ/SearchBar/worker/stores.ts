import { z } from "zod";
import {
  baseOptItemSchemaStore,
  handleRefineItem,
  itemsSchema,
} from "../general/general";
import {
  generalFiltersStoreSchema,
  handleValidationAvgValsStore,
} from "../general/store";

const allowedKeys = ["name", "country", "state", "city"];

const itemSchema = z
  .object(itemsSchema(allowedKeys))
  .superRefine((item, ctx) => {
    handleRefineItem({ item, optItem: { ...baseOptItemSchemaStore }, ctx });
  });

export const schemaWorkerStores = generalFiltersStoreSchema
  .extend({
    items: z.array(itemSchema).optional(),
  })
  .superRefine((data, ctx) => {
    handleValidationAvgValsStore({ data, ctx });
  });
