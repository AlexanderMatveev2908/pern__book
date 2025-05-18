import { ratingRanges } from "@/core/config/fieldsData/SearchBar/general";
import {
  REG_CITY,
  REG_COUNTRY,
  REG_ID,
  REG_STATE,
  REG_STORE_NAME,
} from "@/core/config/regex";
import { CatBookStore } from "@/types/all/bookStore";
import { DeliveryType, OrderStage } from "@/types/all/orders";
import { z } from "zod";
import { isValidNumber } from "../../../utils/dataStructures";
import { schemaPrice, schemaInt } from "./general";

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

const allowedKeys = ["name", "ID", "country", "state", "city"] as const;
type AllowedKey = (typeof allowedKeys)[number];

const regexMap: Record<AllowedKey, RegExp> = {
  name: REG_STORE_NAME,
  ID: REG_ID,
  country: REG_COUNTRY,
  state: REG_STATE,
  city: REG_CITY,
};

const maxLengthMap: Record<AllowedKey, number> = {
  ID: 36,
  name: 50,
  country: 50,
  state: 50,
  city: 50,
};

const itemSchema = z
  .object({
    field: z.enum(allowedKeys),
    val: z.string().optional(),
    id: z.string(),
  })
  .superRefine((item, ctx) => {
    const { field, val } = item;
    const regex = regexMap[field];
    const maxLength = maxLengthMap[field];

    if (!val?.trim()?.length) return;

    if (val.length > maxLength) {
      ctx.addIssue({
        code: "custom",
        path: [`val`],
        message: `Max length for ${field} is ${maxLength}`,
      });
    }

    if (!regex.test(val)) {
      ctx.addIssue({
        code: "custom",
        path: [`val`],
        message: `Invalid ${field} format`,
      });
    }
  });

export const searchBarStore = z
  .object({
    items: z.array(itemSchema).optional(),

    categories: z
      .array(z.enum(Object.values(CatBookStore) as [string, ...string[]]))
      .optional(),
    orders: z
      .array(z.enum(Object.values(OrderStage) as [string, ...string[]]))
      .optional(),
    delivery: z
      .array(z.enum(Object.values(DeliveryType) as [string, ...string[]]))
      .optional(),
    avgRating: z
      .array(z.enum(ratingRanges as [string, ...string[]]))
      .optional(),

    minAvgPrice: schemaPrice(),
    maxAvgPrice: schemaPrice(),
    minAvgQty: schemaInt(),
    maxAvgQty: schemaInt(),

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
