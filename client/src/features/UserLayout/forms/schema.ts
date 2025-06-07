import { z } from "zod";
import { schemaNames } from "../../AuthLayout/forms/auth";
import { REG_PHONE } from "@/core/config/regex";
import { schemaAddress } from "@/core/lib/all/forms/schemaZ/address";

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
