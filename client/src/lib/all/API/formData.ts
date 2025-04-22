import { UserProfileForm } from "@/features/UserLayout/UserProfile/UserProfile";
import { captAll } from "../utils/formatters";

export const makeFormDataProfile = (
  formDataHook: UserProfileForm
): FormData => {
  const formData = new FormData();

  for (const key in formDataHook) {
    if (key === "Thumb") {
      const file = formDataHook?.Thumb?.[0] as File | undefined;
      if (file instanceof File) formData.append("Thumb", file);
    } else {
      const val = formDataHook[key as keyof UserProfileForm];

      if (typeof val === "string" && !!(val as string)?.trim()?.length)
        formData.append(
          key,
          ["country", "state", "city"].includes(val)
            ? captAll(val).trim()
            : (val.trim() as string)
        );
    }
  }

  return formData;
};
