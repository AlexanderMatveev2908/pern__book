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
    .min(2, "Country is required")
    .max(30, "Max length Country exceeded")
    .regex(REG_COUNTRY, "Invalid Country format"),
  state: z
    .string()
    .min(2, "State is required")
    .max(30, "Max length State exceeded")
    .regex(REG_STATE, "Invalid State format"),
  city: z
    .string()
    .min(2, "City is required")
    .max(30, "Max length City exceeded")
    .regex(REG_CITY, "Invalid City format"),
  street: z
    .string()
    .min(4, "Street is required")
    .max(60, "Max length street exceeded")
    .regex(REG_STREET, "Invalid street format"),
  zipCode: z
    .string()
    .min(4, "Zip Code is required")
    .max(9, "Max length Zip Code exceeded")
    .regex(REG_ZIP, "Invalid Zip Code format"),
  phone: z
    .string()
    .min(9, "Phone is required")
    .max(21, "Phone length exceeded")
    .regex(REG_PHONE, "Invalid phone format"),
});
