import {
  REG_INT,
  REG_PRICE,
  REG_STORE_DESC,
  REG_STORE_NAME,
} from "@/config/regex";
import { z } from "zod";
import { schemaEmail } from "./auth";
import { schemaAddress } from "./user";
import { UserRole } from "@/types/types";

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
      .min(10, "If Provided a description should have at least 10 chars")
      .max(200, "Max length description exceeded")
      .regex(REG_STORE_DESC, "Invalid description format"),
    // video: z.number().min(10, "min is 10"),
    video: z
      .union([z.string(), z.instanceof(FileList)])
      .optional()
      .refine(
        (val) => {
          if (!val?.length) return true;
          if (val instanceof FileList)
            return val?.[0]?.type?.startsWith("video");
        },
        {
          message: "To Upload images use the input below",
        }
      ),
    images: z
      .union([z.array(z.string()), z.array(z.instanceof(File))])
      .optional(),
    // images: z.number().min(10, "min is 10"),
    website: z
      .string()
      .url("Invalid url format")
      .refine((val) => val.startsWith("https://"), {
        message: "We can allow HTTPS urls only ",
      }),
    deliveryPrice: z
      .string()
      .optional()
      .refine((val) => !val?.trim().length || REG_PRICE.test(val ?? ""), {
        message: "Invalid price format",
      })
      .refine((val) => !val?.trim().length || +val >= 0.01, {
        message: "Price must be at least $0.01",
      }),
    freeDeliveryAmount: z.string().optional(),
    deliveryTime: z.string().regex(REG_INT, "Invalid day format"),
    items: z
      .array(
        z.object({
          email: z
            .string()
            .optional()
            .refine(
              (val) =>
                !val?.trim().length ||
                z.string().email().safeParse(val).success,
              {
                message: "Invalid email format",
              }
            ),
          role: z
            .enum([UserRole.EMPLOYEE, UserRole.MANAGER])
            .nullable()
            .optional(),
        })
      )
      .optional(),
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
  .refine(
    (data) =>
      !data.freeDeliveryAmount?.trim().length ||
      REG_PRICE.test(data.freeDeliveryAmount ?? ""),
    {
      path: ["freeDeliveryAmount"],
      message: "Invalid price format",
    }
  )
  .superRefine((data, ctx) => {
    const userUpload =
      !!data?.images?.length &&
      data?.images?.every((img: File | string) => img instanceof File);

    if (
      userUpload &&
      Array.isArray(data.images) &&
      !data?.images.every((img: File | string) =>
        (img as File)?.type?.startsWith("image")
      )
    )
      ctx.addIssue({
        path: ["images"],
        message: "Use input above for video",
        code: "custom",
      });

    if (userUpload && (data?.images?.length ?? 0) > 5)
      ctx.addIssue({
        path: ["images"],
        message: `Exceeded max length ${data.images?.length} / 5`,
        code: "custom",
      });
  });
