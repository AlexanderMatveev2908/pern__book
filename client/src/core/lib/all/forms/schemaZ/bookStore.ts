import { z } from "zod";
import { schemaEmail } from "./auth";
import { schemaAddress } from "./user";
import { UserRole } from "@/types/types";
import {
  REG_INT,
  REG_PRICE,
  REG_STORE_DESC,
  REG_STORE_NAME,
} from "@/core/config/regex";
import { CatBookStore } from "@/types/all/bookStore";

const allowedRoles = [UserRole.EMPLOYEE, UserRole.MANAGER];

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
      .max(200, "Max length description exceeded")
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
      }),
    freeDeliveryAmount: z.string().optional(),
    deliveryTime: z.string().regex(REG_INT, "Invalid day format"),
    items: z.array(
      z.object({
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
          .optional()
          .nullable(),
      })
    ),
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

    const len = data.items?.length;
    let i = 0;
    while (i < len) {
      const curr = data.items[i];
      if (curr.email?.trim().length && !curr.role) {
        ctx.addIssue({
          message: "Worker need a role",
          code: "custom",
          path: [`items.${i}.role`],
        });
        break;
      }
      if (curr.role && !curr.email?.trim().length) {
        ctx.addIssue({
          message: `This ${curr.role} need an email`,
          code: "custom",
          path: [`items.${i}.email`],
        });
        break;
      }
      i++;
    }

    const workers = len ? data.items.map((el) => el.email) : [];
    i = 0;

    // const checkArr: string[] = [];
    const checkArr = new Set<string>();
    let indexDuplicate: number | null = null;
    if (len > 1) {
      do {
        const curr = workers[i];
        // if (checkArr.some((el) => el === curr))
        if (checkArr.has(curr as string)) {
          // ctx.addIssue({
          //   message: `You can not hire twice ${curr}`,
          //   code: "custom",
          //   path: [`items.${i}.email`],
          // });
          indexDuplicate = i;
        }

        // checkArr.push(curr as string);
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
