/* eslint-disable @typescript-eslint/no-explicit-any */
import { ratingRanges } from "@/features/common/SearchBar/fields/general/general";
import { CatBookStore } from "@/types/all/bookStore";
import { DeliveryType, StoreOrderStage } from "@/types/all/orders";
import { z } from "zod";
import { generateZodSorters, schemaInt, schemaPrice } from "./general";
import { isValidNumber } from "@/core/lib/lib";

export const msgsFormStore = {
  price: {
    min: "Min price is bigger than max price",
    max: "Max price is lower than min price",
  },
  qty: {
    min: "Min qty must be lower than max qty",
    max: "Max qty must be bigger than min qty",
  },
  work: {
    managers: "You do not have all these managers",
    employees: "You do not have all these employees",
  },
};

export const generalFiltersStoreSchema = z.object({
  categories: z
    .array(z.enum(Object.values(CatBookStore) as [string, ...string[]]))
    .optional(),
  orders: z
    .array(z.enum(Object.values(StoreOrderStage) as [string, ...string[]]))
    .optional(),
  delivery: z
    .array(z.enum(Object.values(DeliveryType) as [string, ...string[]]))
    .optional(),
  avgRating: z.array(z.enum(ratingRanges as [string, ...string[]])).optional(),

  minAvgPrice: schemaPrice(),
  maxAvgPrice: schemaPrice(),
  minAvgQty: schemaInt(),
  maxAvgQty: schemaInt(),

  ...generateZodSorters([
    "createdAtSort",
    "updatedAtSort",
    "avgRatingSort",
    "avgPriceSort",
    "avgQtySort",
  ]),
});

export const handleValidationAvgValsStore = ({ data, ctx }: any) => {
  if (isValidNumber(data?.minAvgPrice) && isValidNumber(data?.maxAvgPrice)) {
    if (+(data!.minAvgPrice as string) > +(data!.maxAvgPrice as string))
      ctx.addIssue({
        message: msgsFormStore.price.min,
        code: "custom",
        path: ["minAvgPrice"],
        params: { type: "DISPARITY" },
      });
    if (+(data!.maxAvgPrice as string) < +(data!.minAvgPrice as string))
      ctx.addIssue({
        code: "custom",
        message: msgsFormStore.price.max,
        path: ["maxAvgPrice"],
      });
  }

  if (isValidNumber(data?.minAvgQty) && isValidNumber(data?.maxAvgQty)) {
    if (+data.minAvgQty! > +data.maxAvgQty!)
      ctx.addIssue({
        code: "custom",
        path: ["minAvgQty"],
        message: msgsFormStore.qty.min,
      });

    if (+data.maxAvgQty! < +data.minAvgQty!)
      ctx.addIssue({
        code: "custom",
        path: ["maxAvgQty"],
        message: msgsFormStore.qty.max,
      });
  }
};
