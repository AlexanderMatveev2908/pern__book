import { UserProfileForm } from "@/pages/UserLayout/ProfileSettings/ProfileSettings";
import { captAll } from "../utils/formatters";

const appendKey = (val: string) => captAll(val).trim();

const parseNull = (str: string) => (str.trim().length ? str : "_");

export const makeFormDataProfile = (
  formDataHook: UserProfileForm
): FormData => {
  const formData = new FormData();

  for (const key in formDataHook) {
    if (key === "thumb") {
      if (typeof formDataHook.thumb === "string") {
        formData.append("thumb", parseNull(formDataHook.thumb));
      } else {
        const file = formDataHook?.thumb?.[0] as File | undefined;

        formData.append("thumb", file instanceof File ? file : "_");
      }
    } else {
      const val = formDataHook[key as keyof UserProfileForm];
      formData.append(
        key,
        appendKey(parseNull((val as string) ?? "") as string)
      );
    }
  }

  return formData;
};
