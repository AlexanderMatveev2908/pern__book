/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { isStr, isValidNumber } from "@/core/lib/lib";
import { CatBookStore } from "@/types/all/bookStore";
import { DeliveryType, OrderStage } from "@/types/all/orders";
import { FormFieldBasic } from "@/types/types";
import { z } from "zod";

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

export const baseOptItemSchemaStore = {
  name: {
    reg: REG_STORE_NAME,
    maxLen: 50,
  },
  country: {
    reg: REG_COUNTRY,
    maxLen: 50,
  },
  state: {
    reg: REG_STATE,
    maxLen: 50,
  },
  city: {
    reg: REG_CITY,
    maxLen: 50,
  },
};

export const schemaID = () =>
  z
    .string()
    .max(36, "Invalid id length")
    .optional()
    .refine((val) => !isStr(val) || REG_ID.test(val ?? ""), {
      message: "Invalid id",
    });

export const schemaInt = () =>
  z
    .string()
    .max(10, "Max length exceeded")
    .optional()
    .refine((val) => !isStr(val) || REG_INT.test(val ?? ""), {
      message: "Invalid chars max quantity",
    });

export const schemaPrice = () =>
  z
    .string()
    .max(10, "Max length exceeded")
    .optional()
    .refine((val) => !isStr(val) || REG_PRICE.test(val ?? ""), {
      message: "Invalid format price",
    });

export const itemsSchema = (allowedKeys: string[]) => ({
  field: z.enum(allowedKeys as [string, ...string[]]),
  val: z.string().optional(),
  id: z.string(),
  label: z.string(),
});

export const handleRefineItem = ({
  item,
  optItem,
  ctx,
}: {
  item: FormFieldBasic & { val?: string };
  optItem: { [key: string]: { reg: RegExp; minLen?: number; maxLen?: number } };
  ctx: any;
}) => {
  const { field, val } = item;
  const regex = optItem[field as keyof typeof optItem].reg;
  const minLen =
    (optItem[field as keyof typeof optItem] as any)?.minLen ?? -Infinity;
  const maxLen = optItem[field as keyof typeof optItem]?.maxLen ?? Infinity;

  if (!val?.trim()?.length) return;

  if (val.length < minLen)
    ctx.addIssue({
      code: "custom",
      path: [`val`],
      message: `Min length for ${field} is ${minLen}`,
    });

  if (val.length > maxLen)
    ctx.addIssue({
      code: "custom",
      path: [`val`],
      message: `Max length for ${field} is ${maxLen}`,
    });

  if (!regex.test(val))
    ctx.addIssue({
      code: "custom",
      path: [`val`],
      message: `Invalid ${field} format`,
    });
};

export const generalFiltersStoreSchema = z.object({
  categories: z
    .array(z.enum(Object.values(CatBookStore) as [string, ...string[]]))
    .optional(),
  orders: z
    .array(z.enum(Object.values(OrderStage) as [string, ...string[]]))
    .optional(),
  delivery: z
    .array(z.enum(Object.values(DeliveryType) as [string, ...string[]]))
    .optional(),
  avgRating: z.array(z.enum(ratingRanges as [string, ...string[]])).optional(),

  minAvgPrice: schemaPrice(),
  maxAvgPrice: schemaPrice(),
  minAvgQty: schemaInt(),
  maxAvgQty: schemaInt(),
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
