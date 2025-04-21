import {
  REG_CITY,
  REG_COUNTRY,
  REG_PHONE,
  REG_STATE,
  REG_STREET,
  REG_ZIP,
} from "@/config/regex";
import { z } from "zod";

export const schemaAddress = () => ({
  country: z
    .string()
    .max(30, "Max length Country exceeded")
    .regex(REG_COUNTRY, "Invalid Country format"),
  state: z
    .string()
    .max(30, "Max length State exceeded")
    .regex(REG_STATE, "Invalid State format"),
  city: z
    .string()
    .max(30, "Max length City exceeded")
    .regex(REG_CITY, "Invalid City format"),
  street: z
    .string()
    .max(100, "Max length street exceeded")
    .regex(REG_STREET, "Invalid street format"),
  zipCode: z
    .string()
    .max(9, "Max length Zip Code exceeded")
    .regex(REG_ZIP, "Invalid Zip Code format"),
  phone: z.string().regex(REG_PHONE, "Invalid phone format"),
});
