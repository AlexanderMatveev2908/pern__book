import {
  REG_CITY,
  REG_COUNTRY,
  REG_PHONE,
  REG_STATE,
  REG_STREET,
  REG_ZIP,
} from "@/core/config/regex";
import { z } from "zod";

export const schemaAddress = (opt?: boolean) => {
  return {
    country: z
      .string()
      .min(opt ? 0 : 2, "Country is required")
      .max(50, "Max length Country exceeded")
      .regex(REG_COUNTRY, "Invalid country"),
    state: z
      .string()
      .min(opt ? 0 : 2, "State is required")
      .max(50, "Max length State exceeded")
      .regex(REG_STATE, "Invalid state"),
    city: z
      .string()
      .min(opt ? 0 : 2, "City is required")
      .max(50, "Max length City exceeded")
      .regex(REG_CITY, "Invalid city"),
    street: z
      .string()
      .min(opt ? 0 : 4, "Street is required")
      .max(100, "Max length street exceeded")
      .regex(REG_STREET, "Invalid street format"),
    zipCode: z
      .string()
      .min(opt ? 0 : 5, "Zip Code is required")
      .max(10, "Max length Zip Code exceeded")
      .pipe(
        opt ? z.string() : z.string().regex(REG_ZIP, "Invalid Zip Code format")
      ),
    phone: z
      .string()
      .min(opt ? 0 : 9, "Phone is required")
      .max(21, "Phone length exceeded")
      .pipe(
        opt ? z.string() : z.string().regex(REG_PHONE, "Invalid phone format")
      ),
  };
};
