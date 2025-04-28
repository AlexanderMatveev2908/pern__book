/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  REG_INT,
  REG_PRICE,
  REG_STORE_DESC,
  REG_STORE_NAME,
} from "@/config/regex";
import { z } from "zod";
import { schemaEmail } from "./auth";
import { schemaAddress } from "./user";

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
    images: z.union([z.array(z.string()), z.array(z.instanceof(File))]),
    // images: z.number().min(10, "min is 10"),
    website: z
      .string()
      .url("Invalid url format")
      .refine((val) => val.startsWith("https://"), {
        message: "We can allow HTTPS urls only ",
      }),
    deliveryPrice: z.string().optional(),
    freeDeliveryAmount: z.string().optional(),
    deliveryTime: z.string().regex(REG_INT, "Invalid day format"),
  })
  .superRefine((data, ctx) => {
    if (data.deliveryPrice?.trim().length)
      if (!REG_PRICE.test(data.deliveryPrice ?? ""))
        ctx.addIssue({
          path: ["deliveryPrice"],
          code: "custom",
          message: "Invalid price format",
        });
      else if (+data.deliveryPrice < 0.01)
        ctx.addIssue({
          path: ["deliveryPrice"],
          code: "custom",
          message: "Price must be at least $0.01",
        });

    if (
      (!data.deliveryPrice?.trim().length || !+data.deliveryPrice) &&
      data.freeDeliveryAmount?.trim().length
    )
      ctx.addIssue({
        path: ["freeDeliveryAmount"],
        code: "custom",
        message: "You can not set free something that already is",
      });

    if (
      data.freeDeliveryAmount?.trim().length &&
      !REG_PRICE.test(data.freeDeliveryAmount ?? "")
    )
      ctx.addIssue({
        path: ["freeDeliveryAmount"],
        code: "custom",
        message: "Invalid price format",
      });

    const userUpload =
      !!data?.images?.length &&
      data?.images?.every((img: any) => img instanceof File);

    if (
      userUpload &&
      !data?.images.every((img: any) =>
        (img as File)?.type?.startsWith("image")
      )
    )
      ctx.addIssue({
        path: ["images"],
        message: "Use input above for video",
        code: "custom",
      });

    if (userUpload && data?.images?.length > 5)
      ctx.addIssue({
        path: ["images"],
        message: `Exceeded max length ${data.images?.length} / 5`,
        code: "custom",
      });
  });
