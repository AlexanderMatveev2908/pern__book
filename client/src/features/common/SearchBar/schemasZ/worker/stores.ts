import { z } from "zod";
import { baseOptItemSchemaStore, itemsSchema } from "../general/general";
import {
  generalFiltersStoreSchema,
  handleValidationAvgValsStore,
} from "../general/store";

const allowedKeys = ["name", "country", "state", "city"];

const itemSchema = itemsSchema({
  allowedKeys,
  optItem: { ...baseOptItemSchemaStore },
});

export const schemaWorkerStores = generalFiltersStoreSchema
  .extend({
    items: z.array(itemSchema).optional(),
  })
  .superRefine((data, ctx) => {
    handleValidationAvgValsStore({ data, ctx });
  });
