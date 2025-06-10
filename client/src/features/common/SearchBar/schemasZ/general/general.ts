/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { FormFieldBasic } from "@/types/types";
import { z } from "zod";

export type ParamsItemSchemaType = {
  allowedKeys: string[];
  optItem: { [key: string]: { reg: RegExp; minLen?: number; maxLen?: number } };
  customValidateCB?: ({
    item,
    ctx,
  }: {
    item: FormFieldBasic;
    ctx: z.RefinementCtx;
  }) => void;
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

export const optInfoFromStore = {
  ID: {
    reg: REG_ID,
    minLen: 0,
    maxLen: 36,
  },
  bookStoreID: {
    reg: REG_ID,
    minLen: 0,
    maxLen: 36,
  },
  bookStoreName: {
    reg: REG_STORE_NAME,
    minLen: 0,
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

export const itemsSchema = ({
  allowedKeys,
  optItem,
  customValidateCB,
}: ParamsItemSchemaType) =>
  z
    .object({
      field: z.enum(allowedKeys as [string, ...string[]]),
      val: z.string().optional(),
      id: z.string(),
      label: z.string(),
      place: z.string().optional(),
    })
    .superRefine((item, ctx) => {
      handleRefineItem({ item, optItem, ctx });

      if (typeof customValidateCB === "function")
        customValidateCB({ item, ctx });
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

export const msgsErrsQtyPriceForm = {
  price: {
    min: "Min price is bigger than max price",
    max: "Max price is lower than min price",
  },
  qty: {
    min: "Min qty must be lower than max qty",
    max: "Max qty must be bigger than min qty",
  },
};

export const superRefinePrices = ({ data, ctx }: any) => {
  if ([data?.minPrice, data?.maxPrice].every(isValidNumber)) {
    const min = +data.minPrice!;
    const max = +data.maxPrice!;
    if (min > max)
      ctx.addIssue({
        code: "custom",
        path: ["minPrice"],
        message: msgsErrsQtyPriceForm.price.min,
      });
    if (max < min)
      ctx.addIssue({
        code: "custom",
        path: ["maxPrice"],
        message: msgsErrsQtyPriceForm.price.max,
      });
  }
};

export const superRefineQtyAndPrice = ({ data, ctx }: any) => {
  if (isValidNumber(data?.minQty) && isValidNumber(data?.maxQty)) {
    const min = +data.minQty!;
    const max = +data.maxQty!;
    if (min > max)
      ctx.addIssue({
        code: "custom",
        path: ["minQty"],
        message: msgsErrsQtyPriceForm.qty.min,
      });
    if (max < min)
      ctx.addIssue({
        code: "custom",
        path: ["maxQty"],
        message: msgsErrsQtyPriceForm.qty.max,
      });
  }

  superRefinePrices({ data, ctx });
};

export const generateZodSorters = (arr: string[]) =>
  arr.reduce((acc, curr) => {
    acc[curr] = z.string().optional();
    return acc;
  }, {} as Record<string, z.ZodTypeAny>);
