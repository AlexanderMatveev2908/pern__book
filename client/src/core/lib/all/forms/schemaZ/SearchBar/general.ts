import { REG_ID, REG_INT, REG_PRICE } from "@/core/config/regex";
import { notStr } from "@/core/lib/lib";
import { z } from "zod";

export const schemaID = () =>
  z
    .string()
    .max(36, "Invalid id length")
    .optional()
    .refine((val) => notStr(val) || REG_ID.test(val ?? ""), {
      message: "Invalid id",
    });

export const schemaInt = () =>
  z
    .string()
    .max(10, "Max length exceeded")
    .optional()
    .refine((val) => notStr(val) || REG_INT.test(val ?? ""), {
      message: "Invalid chars max quantity",
    });

export const schemaPrice = () =>
  z
    .string()
    .max(10, "Max length exceeded")
    .optional()
    .refine((val) => notStr(val) || REG_PRICE.test(val ?? ""), {
      message: "Invalid format price",
    });
