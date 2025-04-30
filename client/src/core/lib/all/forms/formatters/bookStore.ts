import { FormBookStoreType } from "@/pages/OwnerLayout/CreateBooksStore/CreateBooksStorePage";

export const makeFormDataStore = (
  formDataHook: FormBookStoreType
): FormData => {
  const formData = new FormData();

  const pairs = Object.entries(formDataHook);

  let i = 0;

  do {
    const [key, val] = pairs[i];

    if (typeof val === "string") {
      if (!val.trim().length) {
        i++;
        continue;
      }
      formData.append(key, val);

      // ? I THINK JUST VIDEO WILL BE KEPT AS FILE-LIST CAUSE IS HARDER TO WORK WITH INSTEAD OF ARRAY FILE
    } else if (val instanceof FileList && val?.length && key === "video") {
      formData.append("video", val?.[0] as File);
    } else if (Array.isArray(val) && val.length) {
      let j = 0;

      do {
        const curr = val[j];
        if (typeof curr === "string") {
          formData.append(key, curr);
        } else if (curr instanceof File && key === "images") {
          formData.append(`${key}[${j}]`, curr);
        } else if (
          typeof curr === "object" &&
          curr !== null &&
          Object.keys(curr).length &&
          Object.values(curr).every((val) => !!val)
        ) {
          const pairs = Object.entries(curr);

          let y = 0;

          do {
            formData.append(`${key}[${j}][${pairs[y][0]}]`, pairs[y][1]);

            y++;
          } while (y < pairs.length);
        }

        j++;
      } while (j < val.length);
    }

    i++;
  } while (i < pairs.length);

  return formData;
};
