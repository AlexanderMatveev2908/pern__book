import {
  REG_CITY,
  REG_COUNTRY,
  REG_PHONE,
  REG_STATE,
  REG_STREET,
  REG_ZIP,
} from "@/config/regex";
import { z } from "zod";

export const schemaAddress = (opt: boolean = false) => {
  let zipCode = z
    .string()
    .min(opt ? 0 : 4, "Zip Code is required")
    .max(10, "Max length Zip Code exceeded");

  let phone = z
    .string()
    .min(opt ? 0 : 9, "Phone is required")
    .max(21, "Phone length exceeded");

  if (!opt) {
    // zod methods allow reassign val without losing already established validations
    zipCode = zipCode.regex(REG_ZIP, "Invalid Zip Code format");
    phone = phone.regex(REG_PHONE, "Invalid phone format");
  }

  return {
    country: z
      .string()
      .min(opt ? 0 : 2, "Country is required")
      .max(30, "Max length Country exceeded")
      .regex(REG_COUNTRY, "Invalid Country format"),
    state: z
      .string()
      .min(opt ? 0 : 2, "State is required")
      .max(30, "Max length State exceeded")
      .regex(REG_STATE, "Invalid State format"),
    city: z
      .string()
      .min(opt ? 0 : 2, "City is required")
      .max(30, "Max length City exceeded")
      .regex(REG_CITY, "Invalid City format"),
    street: z
      .string()
      .min(opt ? 0 : 4, "Street is required")
      .max(60, "Max length street exceeded")
      .regex(REG_STREET, "Invalid street format"),
    zipCode,
    phone,
  };
};

/*
    zipCode: z
      .string()
      .min(opt ? 0 : 4, "Zip Code is required")
      .max(10, "Max length Zip Code exceeded")
      .regex(REG_ZIP, "Invalid Zip Code format"),
    phone: z
      .string()
      .min(opt ? 0 : 9, "Phone is required")
      .max(21, "Phone length exceeded")
      .regex(REG_PHONE, "Invalid phone format"),
      */
