import { z } from "zod";
import { schemaEmail } from "../../../../../features/AuthLayout/forms/auth";
import { UserRole } from "@/types/types";
import {
  REG_INT,
  REG_PRICE,
  REG_STORE_DESC,
  REG_STORE_NAME,
} from "@/core/config/regex";
import { CatBookStore } from "@/types/all/bookStore";
import { isStr } from "../../utils/dataStructures";
import { schemaAddress } from "./address";

const allowedRoles = [UserRole.EMPLOYEE, UserRole.MANAGER];

export const schemaItemUser = z
  .object({
    email: z
      .string()
      .optional()
      .refine(
        (val) =>
          !val?.trim().length || z.string().email().safeParse(val).success,
        {
          message: "Invalid email format",
        }
      ),
    role: z
      .enum(allowedRoles as [string, ...string[]])
      .nullable()
      .optional(),
  })
  .superRefine((item, ctx) => {
    const { email, role } = item;

    if (isStr(email) && !role)
      ctx.addIssue({
        message: "Worker need a role",
        code: "custom",
        path: ["role"],
      });

    if (role && !isStr(email))
      ctx.addIssue({
        message: "Worker need a email",
        code: "custom",
        path: ["email"],
      });
  });

export const schemaBookStore = z
  .object({
    ...schemaEmail(),
    ...schemaAddress(),
    name: z
      .string()
      .min(2, "BookStore name is required")
      .max(50, "Max length name exceeded")
      .regex(REG_STORE_NAME, "Invalid name format"),
    description: z
      .string()
      .max(12000, "Max length description exceeded")
      .optional()
      .refine((val) => !val?.trim().length || val.length > 10, {
        message: "If provided description must be at least 10 chars",
      })
      .refine((val) => !val?.trim().length || REG_STORE_DESC.test(val), {
        message: "Invalid text chars",
      }),
    // video: z.number().min(10, "min is 10"),
    video: z
      .union([z.string(), z.instanceof(FileList)])
      .optional()
      .nullable()
      .refine(
        (val) => {
          if (!val?.length || typeof val === "string") return true;
          if (val instanceof FileList)
            return val?.[0]?.type?.startsWith("video");
        },
        {
          message: "To Upload images use the input below",
        }
      ),
    images: z
      .union([z.array(z.string()), z.array(z.instanceof(File))])
      .optional()
      .refine(
        (val) => {
          const userUpload =
            Array.isArray(val) &&
            !!val?.length &&
            val?.every((img: File | string) => img instanceof File);

          if (userUpload)
            return val.every((img: File) => img?.type?.startsWith("image"));

          return true;
        },
        {
          message: "Use the input above for video",
        }
      )
      .refine((val) => !val?.length || val.length <= 5, {
        message: "For practical reason max length images is 5",
      }),
    categories: z
      .array(z.enum(Object.values(CatBookStore) as [string, ...string[]]), {
        required_error: "Category required",
        invalid_type_error: "Invalid data format",
      })
      .min(1, "You should chose at least one category")
      .max(3, "We can not accept more than 3 categories"),
    // images: z.number().min(10, "min is 10"),
    website: z
      .string()
      .optional()
      .refine((val) => !val?.trim().length || val.startsWith("https://"), {
        message: "We can allow HTTPS urls only ",
      })
      .refine(
        (val) => !val?.trim().length || z.string().url().safeParse(val).success,
        {
          message: "Invalid url format",
        }
      ),
    deliveryPrice: z
      .string()
      .optional()
      .refine((val) => !val?.trim().length || REG_PRICE.test(val ?? ""), {
        message: "Invalid price format",
      })
      .refine((val) => !val?.trim().length || +val >= 0.01, {
        message: "Price must be at least $0.01",
      })
      .refine((val) => !val?.trim().length || val.trim().length < 10, {
        message: "A price must be less than 10 chars",
      }),
    freeDeliveryAmount: z
      .string()
      .optional()
      .refine((val) => !val?.trim().length || +val >= 0.01, {
        message: "Price must be at least $0.01",
      })
      .refine((val) => !val?.trim().length || REG_PRICE.test(val ?? ""), {
        message: "Invalid price format",
      })
      .refine((val) => !val?.trim().length || val.trim().length < 10, {
        message: "A price must be less than 10 chars",
      }),
    deliveryTime: z
      .string()
      .min(1, "Delivery time is required")
      .max(3, "Max length exceeded")
      .regex(REG_INT, "Invalid day format"),

    items: z.array(schemaItemUser).optional(),
  })

  .refine(
    (data) => {
      const isPriceReal =
        data.deliveryPrice?.trim().length &&
        +(data.deliveryPrice ?? "0") >= 0.01;

      if (data.freeDeliveryAmount?.trim().length) return isPriceReal;

      return true;
    },
    {
      path: ["freeDeliveryAmount"],
      message: "You can not set free something that already is",
    }
  )
  .superRefine((data, ctx) => {
    // * USER ROLE
    const len = data.items?.length ?? 0;
    let i = 0;

    const workers = len ? (data?.items ?? []).map((el) => el?.email) : [];
    const checkArr = new Set<string>();
    let indexDuplicate: number | null = null;
    if (len > 1) {
      do {
        const curr = workers[i];
        if (checkArr.has(curr as string)) {
          indexDuplicate = i;
          break;
        }

        checkArr.add(curr as string);
        i++;
      } while (i < len);
    }
    if (typeof indexDuplicate === "number")
      ctx.addIssue({
        message: `You can not hire twice a worker`,
        code: "custom",
        path: [`items.${indexDuplicate}.email`],
      });
  });
