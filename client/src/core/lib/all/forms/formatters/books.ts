import { BookFormType } from "@/core/contexts/FormsCtx/hooks/useFormsCtxProvider";

export const makeBooksFormData = (formHookData: BookFormType): FormData => {
  const formData = new FormData();

  for (const key in formHookData) {
    const val = formHookData[key as keyof BookFormType];

    if (typeof val === "string") {
      if (!val.trim().length) continue;

      formData.append(key, val);
    } else if (Array.isArray(val)) {
      if (key === "images") {
        for (const el of val) {
          formData.append(key, el);
        }
      } else {
        for (const el of val) {
          formData.append(`${key}[]`, el);
        }
      }
    }
  }

  return formData;
};
