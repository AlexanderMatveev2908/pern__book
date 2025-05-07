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

export const searchBarStore = z.object({
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
});
