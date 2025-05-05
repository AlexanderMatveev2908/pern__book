import { z } from "zod";
import { schemaNames } from "./auth";
import {
  REG_CITY,
  REG_COUNTRY,
  REG_PHONE,
  REG_STATE,
  REG_STREET,
  REG_ZIP,
} from "@/core/config/regex";

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

export const schemaProfile = z
  .object({
    ...schemaNames(),

    thumb: z.union([z.string(), z.instanceof(FileList)]).optional(),

    ...schemaAddress(true),
  })
  .refine(
    (data) => {
      if (!data.thumb?.length && data.thumb instanceof FileList) return true;
      if (typeof data.thumb === "string") return true;

      const updatedFile: File = (data.thumb as FileList)[0];
      return updatedFile && updatedFile.type.startsWith("image");
    },
    {
      message: "thumbnail must be a file of type image",
      path: ["thumb"],
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
  .refine((data) => data.zipCode.trim().length >= 5 || !data.zipCode, {
    message: "If provided Zip Code must match correct format",
    path: ["zipCode"],
  })
  .refine((data) => REG_PHONE.test(data.phone) || !data.phone, {
    message: "If provided phone must follow correct format",
    path: ["phone"],
  });
