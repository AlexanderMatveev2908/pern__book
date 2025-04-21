import {
  REG_CITY,
  REG_COUNTRY,
  REG_PHONE,
  REG_STATE,
  REG_STREET,
  REG_ZIP,
} from "@/config/regex";
import { z } from "zod";
import { schemaNames } from "./auth";

export const schemaAddress = (opt: boolean = false) => {
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
    zipCode: z
      .string()
      .min(opt ? 0 : 4, "Zip Code is required")
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

export const schemaProfile = z
  .object({
    ...schemaNames(),

    Thumb: z.union([z.string(), z.instanceof(FileList)]).optional(),

    ...schemaAddress(true),
  })
  .refine(
    (data) => {
      if (!data.Thumb?.length && data.Thumb instanceof FileList) return true;
      if (typeof data.Thumb === "string") return true;

      const updatedFile: File = (data.Thumb as FileList)[0];
      return updatedFile && updatedFile.type.startsWith("image");
    },
    {
      message: "Thumbnail must be a file of type image",
      path: ["Thumb"],
    }
  )
  .refine((data) => data.country.trim().length >= 2 || !data.country, {
    message: "If provided Country must have at least 2 chars",
    path: ["country"],
  })
  .refine((data) => data.state.trim().length >= 2 || !data.state, {
    message: "If provided State must have at least 2 chars",
    path: ["state"],
  })
  .refine((data) => data.city.trim().length >= 2 || !data.city, {
    message: "If provided City must have at least 2 chars",
    path: ["city"],
  })
  .refine((data) => data.street.trim().length >= 4 || !data.street, {
    message: "If provided street must have at least 4 chars",
    path: ["street"],
  })
  .refine((data) => data.zipCode.trim().length >= 4 || !data.zipCode, {
    message: "If provided Zip Code must be at least 4 chars",
    path: ["zipCode"],
  })
  .refine((data) => data.phone.trim().length >= 9 || !data.phone, {
    message: "If provided phone must be at least 9 chars",
    path: ["phone"],
  });

/*
  let zipCode = z
    .string()
    .min(opt ? 0 : 4, "Zip Code is required")
    .max(10, "Max length Zip Code exceeded");

  let phone = z
    .string()
    .min(opt ? 0 : 9, "Phone is required")
    .max(21, "Phone length exceeded");

  if (!opt) {
    // zod methods allow reassign val without losing already established validations cause each schema is immutable and each method return a new instance
    zipCode = zipCode.regex(REG_ZIP, "Invalid Zip Code format");
    phone = phone.regex(REG_PHONE, "Invalid phone format");
  }
    */
