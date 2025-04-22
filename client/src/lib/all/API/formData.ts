import { UserProfileForm } from "@/features/UserLayout/UserProfile/UserProfile";
import { capt, captAll } from "../utils/formatters";

const appendKey = (key: string, val: string) =>
  key === "street"
    ? capt(val.trim() as string)
    : ["zipCode", "phone", "street"].includes(key)
    ? val.trim()
    : // firstName last, country ecc...
      captAll(val).trim();

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
        appendKey(key, parseNull((val as string) ?? "") as string)
      );
    }
  }

  return formData;
};
