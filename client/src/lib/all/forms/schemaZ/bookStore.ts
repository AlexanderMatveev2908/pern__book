import { REG_STORE_DESC, REG_STORE_NAME } from "@/config/regex";
import { z } from "zod";

export const schemaBookStore = z
  .object({
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
    images: z
      .union([z.array(z.string()), z.array(z.instanceof(File))])
      .optional(),
    // images: z.number().min(10, "min is 10"),
  })
  .refine(
    (data) => {
      if (!data.video?.length) return true;
      if (data?.video instanceof FileList)
        return data?.video?.[0]?.type?.startsWith("video");
    },
    {
      message: "To Upload images use the input below",
      path: ["video"],
    }
  )
  .superRefine((data, ctx) => {
    if (!data?.images?.length) return true;
    if (
      Array.isArray(data.images) &&
      data.images.every((el) => typeof el === "string")
    )
      return true;

    if (data?.images?.length > 5) {
      ctx.addIssue({
        code: "custom",
        message: `Max length images exceeded ${data?.images?.length}/5`,
        path: ["images"],
      });
    }
  })
  .refine(
    (data) => {
      if (!data?.images?.length) return true;

      if (
        data?.images?.length &&
        !!data?.images?.every((img) => img instanceof File)
      )
        return data?.images.every((img) =>
          (img as File)?.type?.startsWith("image")
        );
    },
    {
      message: "Use the input above to upload video",
      path: ["images"],
    }
  );
