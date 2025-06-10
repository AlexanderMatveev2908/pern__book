import { REG_ID } from "@/core/config/regex";
import { z } from "zod";
import {
  schemaInt,
  itemsSchema,
  baseOptItemSchemaStore,
} from "../general/general.ts";
import { isValidNumber } from "@/core/lib/lib.ts";
import {
  generalFiltersStoreSchema,
  handleValidationAvgValsStore,
  msgsFormStore,
} from "../general/store.ts";

const allowedKeys = ["name", "ID", "country", "state", "city"];

const optItem = {
  ...baseOptItemSchemaStore,
  ID: {
    reg: REG_ID,
    maxLen: 36,
  },
};

const itemSchema = itemsSchema({
  allowedKeys,
  optItem,
});

export const searchBarStore = generalFiltersStoreSchema
  .extend({
    items: z.array(itemSchema).optional(),

    workers: schemaInt(),
    managers: schemaInt(),
    employees: schemaInt(),

    ...[
      "createdAtSort",
      "updatedAtSort",
      "avgRatingSort",
      "avgPriceSort",
      "avgQtySort",
    ].reduce((acc, curr) => {
      acc[curr] = z.string().optional();
      return acc;
    }, {} as Record<string, z.ZodTypeAny>),
  })
  .superRefine((data, ctx) => {
    handleValidationAvgValsStore({ data, ctx });

    if (
      (isValidNumber(data?.managers) || isValidNumber(data?.employees)) &&
      isValidNumber(data?.workers)
    ) {
      if (+(data?.managers ?? 0) > +data.workers!)
        ctx.addIssue({
          code: "custom",
          message: msgsFormStore.work.managers,
          path: ["managers"],
        });

      if (+(data?.employees ?? 0) > +data.workers!)
        ctx.addIssue({
          code: "custom",
          message: msgsFormStore.work.employees,
          path: ["employees"],
        });
    }
  });
