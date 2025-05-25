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
import { isStr } from "@/core/lib/lib";
import { FormFieldBasic } from "@/types/types";
import { z } from "zod";

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
