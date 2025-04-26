import { REG_STORE_DESC, REG_STORE_NAME } from "@/config/regex";
import { z } from "zod";

export const schemaBookStore = () => ({
  name: z
    .string()
    .min(2, "BookStore name is required")
    .max(50, "Max length name exceeded")
    .regex(REG_STORE_NAME, "Invalid name format"),
  description: z
    .string()
    .min(10, "If Provided a description should have at least 10 chars")
    .max(200, "Max length description exceeded")
    .regex(REG_STORE_DESC, "Invalid description format"),
  // video: z.number().min(10, "min is 10"),
  video: z.union([z.string(), z.instanceof(FileList)]).optional(),
});
