import { REG_STORE_NAME } from "@/config/regex";
import { z } from "zod";

export const schemaBookStore = () => ({
  name: z
    .string()
    .min(2, "BookStore name is required")
    .max(50, "Max length name exceeded")
    .regex(REG_STORE_NAME, "Invalid name format"),
});
