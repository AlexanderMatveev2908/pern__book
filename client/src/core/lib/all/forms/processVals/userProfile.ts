import { UserProfileForm } from "@/pages/UserLayout/ProfileSettings/ProfileSettings";
import { appendKey, parseNullPost } from "../../utils/formatters";

export const makeFormDataProfile = (
  formDataHook: UserProfileForm
): FormData => {
  const formData = new FormData();

  for (const key in formDataHook) {
    if (key === "thumb") {
      if (typeof formDataHook.thumb === "string") {
        formData.append("thumb", parseNullPost(formDataHook.thumb));
      } else {
        const file = formDataHook?.thumb?.[0] as File | undefined;

        formData.append("thumb", file instanceof File ? file : "_");
      }
    } else {
      const val = formDataHook[key as keyof UserProfileForm];
      formData.append(
        key,
        appendKey(parseNullPost((val as string) ?? "") as string)
      );
    }
  }

  return formData;
};
