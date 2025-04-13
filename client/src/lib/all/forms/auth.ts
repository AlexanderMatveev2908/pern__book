import { z } from "zod";
import { REG_NAME, REG_PWD } from "../../../config/regex";

export const schemaEmail = () => ({
  email: z
    .string()
    .min(1, "Email is required")
    .max(50, "Email too long")
    .email("Invalid Email Format"),
});
export const schemaPwd = () => ({
  password: z
    .string()
    .min(1, "Password is required")
    .max(30, "Password too long")
    .regex(REG_PWD, "Invalid password format")
    .nullable(),
});
export const schemaLogin = {
  ...schemaEmail(),
  ...schemaPwd(),
};

export const schemaRegister = z
  .object({
    firstName: z
      .string()
      .min(1, "First Name is required")
      .max(30, "First Name must be less than 30 characters")
      .regex(REG_NAME, "Invalid First Name format"),
    lastName: z
      .string()
      .min(1, "Last Name is required")
      .max(30, "First Name must be less than 30 characters")
      .regex(REG_NAME, "Invalid Last Name format"),
    ...schemaEmail(),
    ...schemaPwd(),
    confirmPassword: z.string().min(1, "You must confirm your password"),
    terms: z.boolean().nullable(),
  })
  .refine((data) => data.firstName.trim(), {
    message: "First Name is required",
    path: ["firstName"],
  })
  .refine((data) => data.lastName.trim(), {
    message: "First Name is required",
    path: ["lastName"],
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.email !== data.password, {
    message: "Email and Password must be different",
    path: ["password"],
  })
  .refine((data) => data.terms, {
    message: "You must accept the terms",
    path: ["terms"],
  });
