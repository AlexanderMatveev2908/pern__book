import { ratingRanges } from "@/core/config/fieldsData/SearchBar/general";
import {
  REG_CITY,
  REG_COUNTRY,
  REG_ID,
  REG_INT,
  REG_PRICE,
  REG_STATE,
  REG_STORE_NAME,
} from "@/core/config/regex";
import { CatBookStore } from "@/types/all/bookStore";
import { DeliveryType, OrderStage } from "@/types/all/orders";
import { z } from "zod";
import { isValidNumber } from "../../../dataStructures";

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

export const searchBarStore = z
  .object({
    name: z
      .string()
      .max(50, "Max length exceeded")
      .optional()
      .refine((val) => !val?.trim()?.length || REG_STORE_NAME.test(val), {
        message: "Invalid name format",
      }),
    ID: z
      .string()
      .max(36, "Invalid id length")
      .optional()
      .refine((val) => !val?.trim()?.length || REG_ID.test(val), {
        message: "Invalid id",
      }),
    country: z
      .string()
      .max(50, "Max length Country exceeded")
      .optional()
      .refine((val) => !val?.trim()?.length || REG_COUNTRY.test(val), {
        message: "Invalid Country",
      }),
    state: z
      .string()
      .max(50, "Max length State exceeded")
      .optional()
      .refine((val) => !val?.trim()?.length || REG_STATE.test(val), {
        message: "INvalid state",
      }),
    city: z
      .string()
      .max(50, "Max length City exceeded")
      .optional()
      .refine((val) => !val?.trim()?.length || REG_CITY.test(val), {
        message: "INvalid state",
      }),

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

    minAvgPrice: z
      .string()
      .max(10, "Max length exceeded")
      .optional()
      .refine((val) => !val?.trim().length || REG_PRICE.test(val), {
        message: "Invalid format min price",
      }),
    maxAvgPrice: z
      .string()
      .max(10, "Max length exceeded")
      .optional()
      .refine((val) => !val?.trim().length || REG_PRICE.test(val), {
        message: "Invalid format max price",
      }),
    minAvgQty: z
      .string()
      .max(10, "Max length exceeded")
      .optional()
      .refine((val) => !val?.trim().length || REG_INT.test(val), {
        message: "Invalid chars min qty",
      }),
    maxAvgQty: z
      .string()
      .max(10, "Max length exceeded")
      .optional()
      .refine((val) => !val?.trim().length || REG_INT.test(val), {
        message: "Invalid chars max qty",
      }),

    workers: z
      .string()
      .optional()
      .refine((val) => !val?.trim()?.length || REG_INT.test(val), {
        message: "Invalid number workers",
      }),
    managers: z
      .string()
      .optional()
      .refine((val) => !val?.trim()?.length || REG_INT.test(val), {
        message: "Invalid number managers",
      }),
    employees: z
      .string()
      .optional()
      .refine((val) => !val?.trim()?.length || REG_INT.test(val), {
        message: "Invalid number employees",
      }),

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
